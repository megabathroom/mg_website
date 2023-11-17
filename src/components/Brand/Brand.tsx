import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './Brand.module.css';
import Error404Page from '../../pages/404';
import AppContainer from '../AppContainer/AppContainer';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';
import FetchItemBrands from '../../utils/rest/backend/api/v1/item-brands';
import FetchItemCategories from '../..//utils/rest/backend/api/v1/item-categories';
import GetItemBrandDto from '../../utils/rest/backend/api/v1/item-brands/dto/get-item-brand.dto';
import GetItemCategoryDto from '../../utils/rest/backend/api/v1/item-categories/dto/get-item-category.dto';

export default function Brand() {
  const { brand } = useParams();

  const [is404, setIs404] = useState(false);
  const [itemCategories, setItemCategories] = useState<GetItemCategoryDto[]>(
    [],
  );
  const [itemBrandData, setItemBrandData] = useState<GetItemBrandDto>({
    dp_id: 0,
    dp_isHidden: true,
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
        const brandUrlSegment = `${brand}`;
        const result_brand =
          await FetchItemBrands.filterOneByUrl(brandUrlSegment);
        setItemBrandData(result_brand);

        try {
          const result_item_categories = (
            await FetchItemCategories.filterByBrand(brandUrlSegment)
          ).sort((a, b) => a.dp_sortingIndex - b.dp_sortingIndex);
          setItemCategories(result_item_categories);
        } catch (exception) {
          alert('' + exception);
          alert(exception);
        }
      } catch (exception) {
        setIs404(true);
        alert('' + exception);
        alert(exception);
      }
    })();
  }, [brand]);

  if (is404) {
    return <Error404Page />;
  }

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>{itemBrandData.dp_name}</h2>
        <ul className={styles.items}>
          {itemCategories.map(category => {
            return (
              <li key={category.dp_id}>
                <Link to={`/products/${brand}/${category.dp_urlSegment}`}>
                  <div className={styles.item_image}>
                    {category.dp_photoUrl.length === 0 ? (
                      ''
                    ) : (
                      <img src={category.dp_photoUrl} alt="x" />
                    )}
                  </div>
                  <div className={styles.item_name}>{category.dp_name}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </AppContainer>
    </>
  );
}
