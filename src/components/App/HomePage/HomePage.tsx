import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './HomePage.module.css';
import AppContainer from '../../AppContainer';
import AppBreadcrumbs from '../../AppBreadcrumbs';
import FetchItemCategories from '../../../utils/rest/backend/api/v1/item-categories';
import GetItemCategoryDto from '../../../utils/rest/backend/api/v1/item-categories/dto/get-item-category.dto';

export default function HomePage() {
  const [itemCategories, setItemCategories] = useState<GetItemCategoryDto[]>(
    [],
  );

  useEffect(() => {
    (async function () {
      try {
        const megaCategories = (
          await FetchItemCategories.filterByBrand('mega')
        ).sort((a, b) => a.dp_sortingIndex - b.dp_sortingIndex);
        const megaGeneralCategories = (
          await FetchItemCategories.filterByBrand('mega-general')
        ).sort((a, b) => a.dp_sortingIndex - b.dp_sortingIndex);
        const jItemCategories = [...megaCategories, ...megaGeneralCategories];
        setItemCategories(jItemCategories);
      } catch (exception) {}
    })();
  }, []);

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>Категории номенклатуры</h2>
        <ul className={styles.categories}>
          {itemCategories.map(e => {
            if (e.dp_isHidden) {
              return null;
            }

            return (
              <li key={e.dp_id}>
                <Link to={`${e.dp_urlSegment}`}>
                  <div className={styles.category_image}>
                    {e.dp_photoUrl.length === 0 ? (
                      ''
                    ) : (
                      <img src={e.dp_photoUrl} alt="x" />
                    )}
                  </div>
                  <div className={styles.category_name}>{e.dp_name}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </AppContainer>
    </>
  );
}
