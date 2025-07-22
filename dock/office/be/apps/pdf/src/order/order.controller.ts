import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { HasPermission } from '@pdf/permission/has-permission.decorator';
import { Auth } from '@pdf/auth/auth.decorator';

const json2csv = require('@json2csv/plainjs');

@UseInterceptors(ClassSerializerInterceptor)
@Auth()
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get('orders')
  // @HasPermission('orders')
  async all(@Query('page') page = 1) {
    // return this.orderService.all(['order_items']);
    return this.orderService.paginate(page, ['order_items'] as any);
  }

  @Post('export')
  @HasPermission('orders')
  async export(@Res() res: Response) {
    console.log(`[json2csv]: `, json2csv);
    const parser = new json2csv.Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const orders = await this.orderService.all(['order_items']);

    const json: any = [];
    orders.forEach((o: Order) => {
      json.push({
        ID: o.id,
        Name: o.name,
        Email: o.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      });

      o.order_items.forEach((i: OrderItem) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': i.product_title,
          Price: i.price,
          Quantity: i.quantity,
        });
      });
    });
    const csv = parser.parse(json);
    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    return res.send(csv);
  }

  @Get('chart')
  @HasPermission('orders')
  async chart() {
    return this.orderService.chart();
  }
}
