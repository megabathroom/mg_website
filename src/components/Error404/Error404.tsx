import AppContainer from '../AppContainer/AppContainer';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';

export default function Error404() {
  return (
    <>
      <AppBreadcrumbs />
      <AppContainer>
        <h2>Ошибка 404</h2>
      </AppContainer>
    </>
  );
}
