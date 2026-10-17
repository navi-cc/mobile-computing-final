import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
	{
		path: '',
		canActivate: [authGuard],
		loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes)
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes)
	},
	{
		path: 'history.home',
		loadComponent: () =>
			import('./history.home/history.home.page').then((m) => m.HistoryHomePage)
	}
];
