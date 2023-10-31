import HttpException from '../../../HttpException';
import GetItemCharacteristicDto from './dto/get-item-characteristic.dto';

export default class FetchItemCharacteristics {
  static async get() {
    const url = 'https://de-pa.by/api/v1/item-characteristics';
    const response = await fetch(url);

    if (response.status === 200) {
      const json: GetItemCharacteristicDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
