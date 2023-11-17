import BasketDto from './dto/basket.dto';
import BasketObjectDto from './dto/basket-object.dto';

const BASKET_KEY = 'basket';

export default class BasketController {
  static get() {
    let basket: BasketDto = {};
    try {
      const strBasket = localStorage.getItem(BASKET_KEY);

      if (!strBasket) {
        return basket;
      }

      basket = JSON.parse(strBasket);
      return basket;
    } catch (exception) {
      localStorage.setItem(BASKET_KEY, '{}');
      return basket;
    }
  }

  static getAsArray() {
    const basket: BasketDto = BasketController.get();
    const arr: BasketObjectDto[] = Object.keys(basket).map(model => {
      return {
        model,
        count: basket[model],
      };
    });

    return arr;
  }

  static getModels() {
    const basket: BasketDto = BasketController.get();
    return Object.keys(basket);
  }

  static plus(model: string) {
    try {
      let basket: BasketDto = BasketController.get();

      if (!basket[model]) {
        basket[model] = 0 + 1;
        localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
        return;
      }

      basket[model] = basket[model] + 1;
      localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
    } catch (exception) {
      console.log(exception);
    }
  }

  static minus(model: string) {
    try {
      let basket: BasketDto = BasketController.get();

      if (!basket[model]) {
        return;
      }

      basket[model] = basket[model] - 1;
      if (basket[model] === 0) {
        delete basket[model];
        localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
        return;
      }

      localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
    } catch (exception) {
      console.log(exception);
    }
  }

  static setCount(model: string, count: number) {
    try {
      let basket: BasketDto = BasketController.get();

      const countInt = Number(Number(count).toFixed(0));
      if (countInt <= 0) {
        delete basket[model];
        localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
        return;
      }

      basket[model] = countInt;
      localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
    } catch (exception) {
      console.log(exception);
    }
  }

  static getCount(model: string): number {
    try {
      let basket: BasketDto = BasketController.get();

      if (!basket[model]) {
        return 0;
      }

      return basket[model];
    } catch (exception) {
      console.log(exception);
      return 0;
    }
  }

  static clear() {
    try {
      let basket: BasketDto = {};
      localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
    } catch (exception) {
      console.log(exception);
    }
  }
}
