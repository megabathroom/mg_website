import styles from './ItemCharacteristicsTable.module.css';
import GetItemDto from '../../../../utils/rest/backend/api/v1/items/dto/get-item.dto';
import GetItemCategoryDto from '../../../../utils/rest/backend/api/v1/item-categories/dto/get-item-category.dto';
import GetItemCharacteristicDto from '../../../../utils/rest/backend/api/v1/item-characteristics/dto/get-item-characteristic.dto';

interface IProps {
  item: GetItemDto;
  itemCategory: GetItemCategoryDto;
  itemCharacteristics: GetItemCharacteristicDto[];
}

export default function ItemCharacteristicsTable(props: IProps) {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead></thead>
        <tbody>
          <TableRowWithName name="Данные номенклатуры" />
          <TableRow name="Наименование" value={props.item.dp_name} />
          <TableRow name="Категория" value={props.itemCategory.dp_name} />
          <TableRow name="Модель" value={props.item.dp_model} />
          <TableRowWithName name="Дополнительные характеристики" />
          {props.itemCharacteristics.map(e => {
            if (e.dp_isHidden) {
              return null;
            }

            const chartact = props.item.dp_itemCharacteristics;

            for (let i = 0; i < chartact.length; ++i) {
              const currentCharact = chartact[i];

              if (currentCharact.dp_characteristicId === e.dp_id) {
                return (
                  <TableRow
                    key={`${e.dp_id}`}
                    name={e.dp_name}
                    value={currentCharact.dp_value}
                  />
                );
              }
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

interface ITableRowProps {
  name: string;
  value: string;
}

function TableRow(props: ITableRowProps) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  );
}

interface ITableRowWithName {
  name: string;
}

function TableRowWithName(props: ITableRowWithName) {
  return (
    <tr className={styles.table_row_with_name}>
      <td colSpan={2}>{props.name}</td>
    </tr>
  );
}
