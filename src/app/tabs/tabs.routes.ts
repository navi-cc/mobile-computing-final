import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
			{
				path: 'fda',
				loadComponent: () => import('../fda/fda.page').then((m) => m.FdaPage)
			},
			{
				path: 'history',
				loadComponent: () => import('../history/history.page').then((m) => m.HistoryPage)
			},
			{
				path: 'profile',
				loadComponent: () => import('../profile/profile.page').then((m) => m.ProfilePage)
			},
			{
				path: '',
				redirectTo: 'fda',
				pathMatch: 'full'
			}
		]
	}
];
