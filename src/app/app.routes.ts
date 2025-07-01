import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'person',
    pathMatch: 'full',
  },
  {
    path: 'person',
    loadComponent: () =>
      import('./features/person/person.component').then(
        (c) => c.PersonComponent
      ),
  },
];
