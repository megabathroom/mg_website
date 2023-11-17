import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Error404Page from '../../pages/404';
import ItemGalery from './ItemGalery/ItemGalery';
import AppContainer from '../AppContainer/AppContainer';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';
import FetchItems from '../../utils/rest/backend/api/v1/items';
import ItemBasketButtons from './ItemBasketButtons/ItemBasketButtons';
import ItemYouTubeVideos from './ItemYouTubeVideos/ItemYouTubeVideos';
import FetchItemBrands from '../../utils/rest/backend/api/v1/item-brands';
import ItemCharacteristics from './ItemCharacteristics/ItemCharacteristics';
import GetItemDto from '../../utils/rest/backend/api/v1/items/dto/get-item.dto';
import FetchItemCategories from '../../utils/rest/backend/api/v1/item-categories';
import FetchItemCharacteristics from '../../utils/rest/backend/api/v1/item-characteristics';
import GetItemBrandDto from '../../utils/rest/backend/api/v1/item-brands/dto/get-item-brand.dto';
import GetItemCategoryDto from '../../utils/rest/backend/api/v1/item-categories/dto/get-item-category.dto';
import GetItemCharacteristicDto from '../../utils/rest/backend/api/v1/item-characteristics/dto/get-item-characteristic.dto';

export default function Item() {
  const { brand, category, model } = useParams();

  const [is404, setIs404] = useState(false);
  const [itemCharacteristics, setItemCharacteristics] = useState<
    GetItemCharacteristicDto[]
  >([]);
  const [itemData, setItemData] = useState<GetItemDto>({
    dp_id: '',
    dp_cost: 0,
    dp_isHidden: '1',
    dp_itemCategoryId: 0,
    dp_itemCharacteristics: [],
    dp_itemGalery: [],
    dp_model: '',
    dp_name: '',
    dp_photoUrl: '',
    dp_seoDescription: '',
    dp_seoKeywords: '',
  });
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

        if (result_brand.dp_isHidden) {
          setIs404(true);
        }

        setItemBrandData(result_brand);

        const categoryUrlSegment = `${category}`;
        const result_category =
          await FetchItemCategories.filterOneByUrl(categoryUrlSegment);

        if (result_category.dp_isHidden) {
          setIs404(true);
        }

        setItemCategoryData(result_category);

        const strModel = `${model}`;
        const jItem = await FetchItems.filterOneByModel(strModel);
        setItemData(jItem);

        const jItemCharacteristics = await FetchItemCharacteristics.get();
        setItemCharacteristics(jItemCharacteristics);
      } catch (exception) {
        setIs404(true);
        alert(exception);
      }
    })();
  }, [brand, category, itemBrandData.dp_isHidden, model]);

  if (is404) {
    return <Error404Page />;
  }

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>{itemData.dp_name}</h2>
        <ItemGalery item={itemData} />
        <ItemBasketButtons item={itemData} />
        <ItemYouTubeVideos item={itemData} />
        <ItemCharacteristics
          item={itemData}
          itemBrand={itemBrandData}
          itemCategory={itemCategoryData}
          itemCharacteristics={itemCharacteristics}
        />
      </AppContainer>
    </>
  );
}
