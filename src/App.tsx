import { FC, lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.tsx';
import { defaultTheme, insertTheme } from './helpers/theme.helper.ts';

insertTheme(defaultTheme());

const Content = lazy(() => import('./components/Content/Content.tsx'));
const App: FC = () => (
  <Suspense
    fallback={<Loader/>}>
    <Content />
  </Suspense>
);

export default App;
