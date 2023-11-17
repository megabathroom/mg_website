import styles from './ItemBarcode.module.css';
import ItemDto from '../../../utils/rest/backend/api/v1/items/dto/item.dto';
import ItemObject from '../../../utils/rest/backend/api/v1/items/dto/ItemObject';

interface IProps {
  item: ItemDto;
}

export default function ItemBarcode(props: IProps) {
  const barcode = ItemObject.getParam(props.item, 22);

  if (barcode.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Баркод</h3>
      <div className={styles.barcode}>*{barcode}*</div>
      <div className={styles.barcode_number}>{barcode}</div>
    </div>
  );
}
