import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LangProvider } from './i18n';

export default function App() {
  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  );
}
