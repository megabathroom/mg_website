import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './CategoryItems.module.css';
import AppContainer from '../AppContainer/AppContainer';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';
import FetchItems from '../../utils/rest/backend/api/v1/items';
import GetItemDto from '../../utils/rest/backend/api/v1/items/dto/get-item.dto';
import FetchItemCategories from '../..//utils/rest/backend/api/v1/item-categories';
import GetItemCategoryDto from '../../utils/rest/backend/api/v1/item-categories/dto/get-item-category.dto';

export default function CategoryItems() {
  const { brand, category } = useParams();

  const [items, setItems] = useState<GetItemDto[]>([]);
  const [itemCategoryData, setItemCategoryData] = useState<GetItemCategoryDto>({
    dp_id: 0,
    dp_isHidden: true,
    dp_itemBrandId: 0,
    dp_name: '',
    dp_photoUrl: '',
    dp_seoDescription: '',
    dp_seoKeywords: '',
    dp_sortingIndex: 0,
    dp_urlSegment: '',
  });

  useEffect(() => {
    (async function () {
      try {
        const categ = `${category}`;
        const jItems = await FetchItems.filterByCategory(categ);
        setItems(jItems);
      } catch (exception) {}
      try {
        const strCategory = `${category}`;
        const jItemCategory =
          await FetchItemCategories.filterOneByUrl(strCategory);
        setItemCategoryData(jItemCategory);
      } catch (exception) {}
    })();
  }, [category]);

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>{itemCategoryData.dp_name}</h2>
        <ul className={styles.items}>
          {items.map(e => {
            return (
              <li key={e.dp_id}>
                <Link to={`/products/${brand}/${category}/${e.dp_model}`}>
                  <div className={styles.item_image}>
                    {e.dp_photoUrl.length === 0 ? (
                      ''
                    ) : (
                      <img src={e.dp_photoUrl} alt="x" />
                    )}
                  </div>
                  <div className={styles.item_code}>Артикул - {e.dp_model}</div>
                  <div className={styles.item_name}>{e.dp_name}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </AppContainer>
    </>
  );
}
