import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations: any[] = []): Promise<any[]> {
    return await this.repository.find({ relations });
  }
  async paginate(page = 1, relations = []) {
    const take = 15;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
    });
    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }
  async create(data: any): Promise<any> {
    return await this.repository.save(data);
  }
  async findOne(condition, relations: any[] = []) {
    return this.repository.findOne({
      where: {
        ...condition,
      },
      relations,
    });
  }
  async update(id: number, data): Promise<any> {
    return this.repository.update(id, data);
  }
  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
