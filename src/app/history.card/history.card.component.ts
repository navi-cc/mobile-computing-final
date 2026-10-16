import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
	ActionSheetController,
	AlertController,
	AlertInput,
	IonIcon,
	IonRippleEffect
} from '@ionic/angular';
import { FdaService } from '../fda/fda.service';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { HoldGestureDirective } from '../hold-gesture';
import { Router } from '@angular/router';
import { auth } from '../firebase';

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

	docId = input.required<string>();
	doc = input.required<{
		id: string;
		search_key?: string;
		is_expired?: boolean;
		is_invalid?: boolean;
	}>();

	private readonly queryClient = inject(QueryClient);
	private router = inject(Router);

	readonly fdaDeleteMutation = injectMutation(() => ({
		mutationFn: async (id: string) => {
			await this.fdaService.delete(id);
			return true;
		},
		onSuccess: () => {
			this.queryClient.invalidateQueries({ queryKey: ['items'] });
		},
		onError: (err) => {
			console.log(err);
		}
	}));

	readonly fdaSaveMutation = injectMutation(() => ({
		mutationFn: async (data: { searchKey: string; id: string; uid: string }) => {
			await this.fdaService.update({ search_key: data.searchKey }, data.id, data.uid);
			return true;
		},
		onSuccess: () => {
			this.queryClient.invalidateQueries({ queryKey: ['items'] });
		},
		onError: (err) => {
			console.log(err);
		}
	}));

	constructor() {}

	async presentActionSheet() {
		const actionSheet = await this.actionSheetCtrl.create({
			header: 'Actions',
			buttons: [
				{
					text: 'Edit',
					data: {
						action: 'edit'
					},
					handler: () => {
						this.presentEditConfirmation();
					}
				},
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
					handler: () => {
						this.fdaDeleteMutation.mutate(this.docId());
					}
				}
			]
		});

		await alert.present();
	}

	async presentEditConfirmation() {
		const alert = await this.alertCtrl.create({
			header: 'Edit Item Name',
			message: `Editing item #${this.docId()}`,
			inputs: [
				{
					value: this.doc().search_key
				}
			],
			buttons: [
				{
					text: 'CANCEL',
					role: 'cancel'
				},
				{
					text: 'SAVE',
					handler: (value) => {
						const newSearchKey = value['0'];

						this.fdaSaveMutation.mutate({
							id: this.docId(),
							searchKey: newSearchKey,
							uid: auth.currentUser?.uid as string
						});
					}
				}
			]
		});

		await alert.present();
	}

	handleViewResult() {
		this.router.navigate([`/history/${this.doc().id}`], {
			queryParams: {
				data: JSON.stringify(this.doc())
			}
		});
	}
}
