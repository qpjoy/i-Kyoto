import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './models/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async all(): Promise<any> {
    return this.roleRepository.find();
  }

  async create(data: any): Promise<Role> {
    return await this.roleRepository.save(data);
  }

  async findOne(condition): Promise<Role> {
    const oneUser = await this.roleRepository.findOne({
      where: {
        ...condition,
      },
      relations: ['permissions'],
    });
    console.log(`[oneUser]: `, oneUser);
    return oneUser as any;
  }

  async update(id: number, data): Promise<any> {
    return this.roleRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.roleRepository.delete(id);
  }
}
