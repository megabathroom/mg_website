import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SendOrder.module.css';
import AppButton from '../AppButton/AppButton';
import AppContainer from '../AppContainer/AppContainer';
import FetchItems from '../../utils/rest/backend/api/v1/items';
import FetchOrders from '../../utils/rest/backend/api/v1/order';
import BasketController from '../../utils/BasketController/BasketController';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';

interface IData {
  name: string;
  email: string;
  phone: string;
}

export default function SendOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    const basket = BasketController.getAsArray();
    if (basket.length === 0) {
      navigate('/basket');
    }
  }, [navigate]);

  const [data, setData] = useState<IData>({
    name: '',
    email: '',
    phone: '',
  });

  async function sendOrder() {
    try {
      if (data.name.length === 0) {
        alert('Имя не указано');
        return;
      }

      if (data.email.length === 0) {
        alert('Электронная почта не указана');
        return;
      }

      if (data.phone.length === 0) {
        alert('Телефон не указан');
        return;
      }

      const models = BasketController.getModels();

      if (models.length === 0) {
        alert('Вы не можете отправить заявку, так как корзина пуста');
        return;
      }

      const items = await FetchItems.filterModels(models);

      if (items.length === 0) {
        alert('Вы не можете отправить заявку, так как корзина пуста');
        return;
      }

      await FetchOrders.createNoAuthOrder({
        dp_name: data.name,
        dp_email: data.email,
        dp_phone: data.phone,
        dp_orderItems: items.map(object => ({
          dp_itemId: object.dp_id,
          dp_count: BasketController.getCount(object.dp_model),
        })),
      });

      BasketController.clear();
      alert('Заявка отправлена');
      navigate('/basket');
    } catch (exception) {
      alert(exception);
    }
  }

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <div className={styles.wrapper}>
          <h2>Укажите данные для отправки заявки</h2>
          <label htmlFor="order_name">Имя</label>
          <input
            id="order_name"
            type="text"
            maxLength={96}
            placeholder="Имя"
            value={data.name}
            onChange={event =>
              setData({
                ...data,
                name: event.target.value,
              })
            }
          />
          <label htmlFor="order_email">E-mail</label>
          <input
            id="order_email"
            type="email"
            maxLength={64}
            placeholder="name@site.com"
            value={data.email}
            onChange={event =>
              setData({
                ...data,
                email: event.target.value,
              })
            }
          />
          <label htmlFor="order_phone">Телефон</label>
          <input
            id="order_phone"
            type="text"
            maxLength={28}
            placeholder="+375-33-111-11-11"
            value={data.phone}
            onChange={event =>
              setData({
                ...data,
                phone: event.target.value,
              })
            }
          />
          <AppButton onClick={sendOrder}>Отправить заявку</AppButton>
        </div>
      </AppContainer>
    </>
  );
}
