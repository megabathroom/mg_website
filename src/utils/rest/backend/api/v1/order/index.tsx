import HttpException from '../../../HttpException';
import CreateNoAuthOrderDto from './dto/create-no-auth-order.dto';
import CreateOrderResponseDto from './dto/create-order-response.dto';

export default class FetchOrders {
  static async createNoAuthOrder(dto: CreateNoAuthOrderDto) {
    const url = 'https://de-pa.by/api/v1/orders/no-auth';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      const json: CreateOrderResponseDto[] = await response.json();
      return json;
    }

    throw new HttpException('POST', response);
  }
}
