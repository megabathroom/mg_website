import { useEffect, useState } from 'react';

import styles from './ItemBasketButtons.module.css';
import ItemDto from '../../../utils/rest/backend/api/v1/items/dto/item.dto';
import AppButton from '../../AppButton/AppButton';
import AppButtonLink from '../../AppButtonLink/AppButtonLink';
import BasketController from '../../../utils/BasketController/BasketController';

interface IItemBasketButtons {
  item: ItemDto;
}

export default function ItemBasketButtons(props: IItemBasketButtons) {
  const [count, setCount] = useState<number>(0);
  const model = props.item.dp_model;

  useEffect(() => {
    const jCount = BasketController.getCount(model);
    setCount(jCount);
  }, [model]);

  function plus() {
    BasketController.plus(model);
    const c = BasketController.getCount(model);
    setCount(c);
  }

  return (
    <div className={styles.wrapper}>
      <h3>Добавляйте в корзину и отправляйте нам заявку</h3>
      <div className={styles.buttons}>
        <AppButton onClick={plus}>
          Добавить в корзину {count === 0 ? null : ` (${count})`}
        </AppButton>
        <AppButtonLink to="/basket">Просмотреть корзину</AppButtonLink>
      </div>
    </div>
  );
}
