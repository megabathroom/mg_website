import { useEffect, useState } from 'react';

import styles from './Basket.module.css';
import AppContainer from '../AppContainer/AppContainer';
import AppButtonLink from '../AppButtonLink/AppButtonLink';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';
import FetchItems from '../../utils/rest/backend/api/v1/items';
import BasketController from '../../utils/BasketController/BasketController';

interface BasketWithItemDataDto {
  dp_name: string;
  dp_model: string;
  dp_photoUrl: string;
  count: number;
}

export default function Basket() {
  const [basketWithItemDataArr, setBasketWothItemDataArr] = useState<
    BasketWithItemDataDto[]
  >([]);

  useEffect(() => {
    (async function () {
      await getBasket();
    })();
  }, []);

  async function getBasket() {
    try {
      const jBasketArr = BasketController.getAsArray();

      const models = jBasketArr.map(e => e.model);

      const items = await FetchItems.filterModels(models);

      const resultArr: BasketWithItemDataDto[] = [];
      for (let i = 0; i < jBasketArr.length; ++i) {
        const currentBasket = jBasketArr[i];
        for (let j = 0; j < items.length; ++j) {
          const currentItem = items[j];
          if (currentBasket.model === currentItem.dp_model) {
            resultArr.push({
              count: currentBasket.count,
              dp_model: currentItem.dp_model,
              dp_name: currentItem.dp_name,
              dp_photoUrl: currentItem.dp_photoUrl,
            });
            break;
          }
        }
      }

      setBasketWothItemDataArr(resultArr);
    } catch (exception) {
      alert(exception);
    }
  }

  async function removeBasketItem(model: string) {
    BasketController.setCount(model, 0);
    await getBasket();
  }

  if (basketWithItemDataArr.length === 0) {
    return (
      <>
        <AppBreadcrumbs />
        <AppContainer>
          <h2>Корзина</h2>
          <div style={{ textAlign: 'center' }}>
            Корзина пуста
            <br /> <AppButtonLink to={'/'}>Добавить номенклатуру</AppButtonLink>
          </div>
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>Корзина</h2>

        <div className={styles.table__block}>
          <table>
            <thead>
              <tr>
                <th>Картинка</th>
                <th>Модель</th>
                <th>Наименование</th>
                <th>Количество</th>
                <th>x</th>
              </tr>
            </thead>
            <tbody>
              {basketWithItemDataArr.map(e => {
                return (
                  <tr key={e.dp_model}>
                    <td className={styles.table__td_image}>
                      <img src={e.dp_photoUrl} alt="" />
                    </td>
                    <td className={styles.table__td_model}>{e.dp_model}</td>
                    <td className={styles.table__td_name}>{e.dp_name}</td>
                    <td className={styles.table__td_count}>{e.count}</td>
                    <td className={styles.table__td_delete}>
                      <button onClick={() => removeBasketItem(e.dp_model)}>
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  <AppButtonLink to={'/'}>Добавить номенклатуру</AppButtonLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {basketWithItemDataArr.length > 0 ? (
          <div className={styles.send_order_wrapper}>
            <AppButtonLink to="/basket/send-order">
              Отправить заявку
            </AppButtonLink>
          </div>
        ) : null}
      </AppContainer>
    </>
  );
}
