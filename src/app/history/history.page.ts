import { Component, inject, OnInit, signal } from '@angular/core';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonIcon,
	IonRippleEffect,
	IonActionSheet,
	ActionSheetController,
	AlertController
} from '@ionic/angular';
import { HoldGestureDirective } from '../hold-gesture';
import { FdaService } from '../fda/fda.service';
import {
	injectMutation,
	injectQuery,
	QueryClient
} from '@tanstack/angular-query-experimental';
import { HistoryCardComponent } from '../history.card/history.card.component';

@Component({
	selector: 'app-tab2',
	templateUrl: 'history.page.html',
	styleUrls: ['history.page.scss'],
	imports: [IonContent, HistoryCardComponent]
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
