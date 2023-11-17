import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Brands.module.css';
import AppContainer from '../AppContainer/AppContainer';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';
import GetItemBrandDto from '../../utils/rest/backend/api/v1/item-brands/dto/get-item-brand.dto';
import FetchItemBrands from '../../utils/rest/backend/api/v1/item-brands';

export default function Brands() {
  const [brands, setBrands] = useState<GetItemBrandDto[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const resultItemBrands = (await FetchItemBrands.get())
          .filter(object => object.dp_urlSegment.startsWith('mega'))
          .sort((a, b) => a.dp_sortingIndex - b.dp_sortingIndex);
        setBrands(resultItemBrands);
      } catch (exception) {}
    })();
  }, []);

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>Электронный каталог</h2>
        <ul className={styles.items}>
          {brands.map(brand => {
            return (
              <li key={brand.dp_id}>
                <Link to={`/products/${brand.dp_urlSegment}/`}>
                  <div className={styles.item_image}>
                    {brand.dp_photoUrl.length === 0 ? (
                      ''
                    ) : (
                      <img src={brand.dp_photoUrl} alt="x" />
                    )}
                  </div>
                  <div className={styles.item_name}>{brand.dp_name}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </AppContainer>
    </>
  );
}
