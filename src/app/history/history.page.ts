import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { FdaService } from '../fda/fda.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
	selector: 'app-tab2',
	templateUrl: 'history.page.html',
	styleUrls: ['history.page.scss'],
	imports: [IonContent, IonRouterOutlet]
})
export class HistoryPage {
	fdaService = inject(FdaService);

	readonly fdaQuery = injectQuery(() => ({
		queryFn: async () => {
			const items = await this.fdaService.get();

			console.log('items', items);

			return items;
		},
		queryKey: ['items']
	}));
}
