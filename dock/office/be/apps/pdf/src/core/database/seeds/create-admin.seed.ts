import { hash } from 'bcryptjs';
import { DataSource } from 'typeorm';
import { User } from '../../../user/models/user.entity';
import { Role } from '../../../role/models/role.entity';
import { Permission } from '../../../permission/models/permission.entity';
import { AppDataSource } from '../data-source'; // Adjust as needed

async function seedAdmin() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const permRepo = AppDataSource.getRepository(Permission);

  // Avoid duplicate admin
  const existing = await userRepo.findOne({
    where: { email: 'admin@memoscard.com' },
  });
  console.log(`[If Admin Existing]: `, existing);
  if (existing) {
    console.log('🟡 Admin already exists');
    return AppDataSource.destroy();
  }

  // Create permissions
  const permNames = [
    'create_user',
    'delete_user',
    'create_role',
    'delete_role',
    'assign_role',
    'view_logs',
    'view_users',
    'roles',
    'permissions',
  ];

  const permissions = await Promise.all(
    permNames.map(async (name) => {
      const existing = await permRepo.findOne({ where: { name } });
      return existing ?? permRepo.save(permRepo.create({ name }));
    }),
  );
  console.log(`[permissions]: `, permissions);

  // Create admin role
  let adminRole = await roleRepo.findOne({
    where: { name: 'admin' },
    relations: ['permissions'],
  });
  console.log(`[Admin Role]: `, adminRole);

  if (!adminRole) {
    adminRole = roleRepo.create({
      name: 'admin',
      permissions,
    });
    await roleRepo.save(adminRole);
  }

  // Create admin user
  const adminUser = userRepo.create({
    email: 'admin@memoscard.com',
    password: await hash('admin123', 12),
    // role: [null],
  });

  adminUser.role = adminRole;

  await userRepo.save(adminUser);
  console.log('✅ Admin seeded successfully');

  await AppDataSource.destroy();
}

seedAdmin().catch((err) => {
  console.error('❌ Failed to seed admin:', err);
  process.exit(1);
});
