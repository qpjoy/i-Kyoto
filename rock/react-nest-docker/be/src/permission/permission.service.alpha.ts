import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './models/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async all(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async create(data: any): Promise<Permission> {
    return await this.permissionRepository.save(data);
  }

  async findOne(condition): Promise<Permission> {
    const oneUser = await this.permissionRepository.findOne(condition);
    console.log(`[oneUser]: `, oneUser);
    return oneUser as any;
  }

  async update(id: number, data): Promise<any> {
    return this.permissionRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.permissionRepository.delete(id);
  }
}
