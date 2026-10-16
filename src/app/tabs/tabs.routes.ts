import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
			{
				path: 'fda',
				loadComponent: () => import('../fda/fda.page').then((m) => m.FdaPage),
				children: [
					{
						path: 'result/:resultId',
						loadComponent: () => import('../result/result.page').then((m) => m.ResultPage)
					},
					{
						path: '',
						loadComponent: () =>
							import('../fda.home/fda.home.page').then((m) => m.FdaHomePage)
					}
				]
			},
			{
				path: 'history',
				loadComponent: () => import('../history/history.page').then((m) => m.HistoryPage),
				children: [
					{
						path: ':docId',
						loadComponent: () => import('../result/result.page').then((m) => m.ResultPage)
					}
				]
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
