import GetItemDto from './dto/get-item.dto';
import HttpException from '../../../HttpException';

export default class FetchItems {
  static async get() {
    const url = 'https://de-pa.by/api/v1/items';
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async getById(id: string) {
    const url = `https://de-pa.by/api/v1/items/${id}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async filterByCategory(category: string) {
    const url = `https://de-pa.by/api/v1/items?category=${category}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async filterOneByModel(model: string) {
    const url = `https://de-pa.by/api/v1/items/filter-one/model/${model}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async filterModels(models: string[]) {
    const url = 'https://de-pa.by/api/v1/items/filter/models';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        models,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const json: GetItemDto[] = await response.json();
      return json;
    }

    throw new HttpException('POST', response);
  }
}
