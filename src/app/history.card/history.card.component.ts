import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
	ActionSheetController,
	AlertController,
	IonIcon,
	IonRippleEffect
} from '@ionic/angular';
import { FdaService } from '../fda/fda.service';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { HoldGestureDirective } from '../hold-gesture';
import { Router } from '@angular/router';

@Component({
	selector: 'app-history-card',
	templateUrl: './history.card.component.html',
	styleUrls: ['./history.card.component.scss'],
	imports: [IonIcon, HoldGestureDirective, IonRippleEffect]
})
export class HistoryCardComponent {
	actionSheetCtrl = inject(ActionSheetController);
	alertCtrl = inject(AlertController);
	fdaService = inject(FdaService);

	docId = input.required();

	private readonly queryClient = inject(QueryClient);
	private router = inject(Router);

	private readonly fdaDeleteMutation = injectMutation(() => ({
		mutationFn: (id: string) => this.fdaService.delete(id),
		onSuccess: () => {
			this.queryClient.invalidateQueries({ queryKey: ['items'] });
		}
	}));

	constructor() {}

	async presentActionSheet() {
		const actionSheet = await this.actionSheetCtrl.create({
			header: 'Actions',
			buttons: [
				{
					text: 'Delete',
					role: 'destructive',
					data: {
						action: 'delete'
					},
					handler: () => {
						this.presentDeleteConfirmation();
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					data: {
						action: 'cancel'
					}
				}
			]
		});

		await actionSheet.present();
	}

	async presentDeleteConfirmation() {
		const alert = await this.alertCtrl.create({
			header: 'Item Delete Confirmation',
			message: 'Are you sure you want to delete this item?',
			buttons: [
				{
					text: 'CANCEL',
					role: 'cancel'
				},
				{
					text: 'DELETE',
					role: 'destructive',
					handler: () => {}
				}
			]
		});

		await alert.present();
	}

	handleViewResult() {
		// TO DO
		this.router.navigate(['']);
	}
}
