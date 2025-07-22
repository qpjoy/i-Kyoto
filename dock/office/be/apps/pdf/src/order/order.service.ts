import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '@pdf/core/abstract.service';
import { Order } from './models/order.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from '@pdf/core/paginated-result.interface';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async paginate(page = 1, relations = []): Promise<PaginatedResult> {
    const { data, meta } = await super.paginate(page, relations);
    return {
      data: data.map((order: Order) => ({
        id: order.id,
        name: order.name,
        email: order.email,
        total: order.total,
        created_at: order.created_at,
        order_items: order.order_items,
      })),
      meta,
    };
  }

  async chart() {
    return this.orderRepository.query(`
      SELECT created_at as date, sum(i.price * i.quantity) as sum 
      FROM orders O 
      JOIN order_items i on o.id = i.order_id
      GROUP BY date; 
    `);
  }
}
