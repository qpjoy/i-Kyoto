import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { OrderController } from './order.controller';
import { AuthModule } from '@pdf/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
