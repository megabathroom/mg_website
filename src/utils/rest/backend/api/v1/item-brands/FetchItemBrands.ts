import HttpException from '../../../HttpException';
import GetItemBrandDto from './dto/get-item-brand.dto';

export default class FetchItemBrands {
  static async get() {
    const url = 'https://de-pa.by/api/v1/item-brands';
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemBrandDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async getById(id: number) {
    const url = `https://de-pa.by/api/v1/item-categories/${id}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemBrandDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async filterOneByUrl(urlSegment: string) {
    const url = `https://de-pa.by/api/v1/item-brands/filter-one/url/${urlSegment}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemBrandDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
