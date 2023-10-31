import HttpException from '../../../HttpException';
import GetItemCategoryDto from './dto/get-item-category.dto';

export default class FetchItemCategories {
  static async get() {
    const url = 'https://de-pa.by/api/v1/item-categories';
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemCategoryDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async getById(id: number) {
    const url = `https://de-pa.by/api/v1/item-categories/${id}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemCategoryDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async filterByBrand(brand: string) {
    const url = `https://de-pa.by/api/v1/item-categories?brand=${brand}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemCategoryDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async filterOneByUrl(urlSegment: string) {
    const url = `https://de-pa.by/api/v1/item-categories/filter-one/url/${urlSegment}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemCategoryDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
