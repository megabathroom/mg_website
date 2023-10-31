import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ItemCarousel from './ItemCarousel';
import AppContainer from '../../AppContainer';
import AppBreadcrumbs from '../../AppBreadcrumbs';
import FetchItems from '../../../utils/rest/backend/api/v1/items';
import ItemCharacteristicsTable from './ItemCharacteristicsTable';
import ItemYouTubeVideos from './ItemYouTubeVideos/ItemYouTubeVideos';
import GetItemDto from '../../../utils/rest/backend/api/v1/items/dto/get-item.dto';
import FetchItemCategories from '../../../utils/rest/backend/api/v1/item-categories';
import FetchItemCharacteristics from '../../../utils/rest/backend/api/v1/item-characteristics';
import GetItemCategoryDto from '../../../utils/rest/backend/api/v1/item-categories/dto/get-item-category.dto';
import GetItemCharacteristicDto from '../../../utils/rest/backend/api/v1/item-characteristics/dto/get-item-characteristic.dto';

export default function ItemPage() {
  const { category, model } = useParams();

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

  useEffect(() => {
    (async function () {
      try {
        const strModel = `${model}`;
        const jItem = await FetchItems.filterOneByModel(strModel);
        setItemData(jItem);
      } catch (exception) {}

      try {
        const jItemCharacteristics = await FetchItemCharacteristics.get();
        setItemCharacteristics(jItemCharacteristics);
      } catch (exception) {}

      try {
        const strCategory = `${category}`;
        const jItemCategory =
          await FetchItemCategories.filterOneByUrl(strCategory);
        setItemCategoryData(jItemCategory);
      } catch (exception) {}
    })();
  }, []);

  const images = itemData.dp_itemGalery.map(e => e.dp_photoUrl);
  if (itemData.dp_photoUrl.length > 0) {
    images.unshift(itemData.dp_photoUrl);
  }

  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>{itemData.dp_name}</h2>
        <ItemCarousel images={images} />
        <ItemYouTubeVideos images={images} />
        <ItemCharacteristicsTable
          item={itemData}
          itemCategory={itemCategoryData}
          itemCharacteristics={itemCharacteristics}
        />
      </AppContainer>
    </>
  );
}
