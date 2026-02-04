import { Routes } from '@angular/router';
// import { DashboardPage } from './gifs/pages/dashboard-page/dashboard-page';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),
    // loadComponent: () =>
    //   import('./gifs/pages/dashboard-page/dashboard-page').then((c) => c.DashboardPage),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page'),
      },
      {
        path: 'history/:query',
        loadComponent: () => import('./gifs/pages/gif-history-page/gif-history-page'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
