import { Routes } from '@angular/router';
import { CountryPage } from './pages/country-page/country-page';
import { BasicPage } from '../reactive/pages/basic-page/basic-page';
export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryPage,
  },
];
