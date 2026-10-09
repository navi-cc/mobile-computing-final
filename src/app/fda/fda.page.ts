import { Component, inject, signal } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';
import { IonContent, IonRouterOutlet } from '@ionic/angular';
import { FdaService } from './fda.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
	selector: 'app-tab1',
	templateUrl: 'fda.page.html',
	styleUrls: ['fda.page.scss'],
	imports: [IonContent, IonRouterOutlet]
})
export class FdaPage {
	fdaService = inject(FdaService);
	inputModel = signal({
		query: ''
	});

	options: AnimationOptions = {
		path: '/assets/loader.json'
	};

	animationCreated(animationItem: AnimationItem): void {
		console.log(animationItem);
	}

	inputForm = form(this.inputModel, (schema) => {
		required(schema.query, { message: 'This field is required.' });
		minLength(schema.query, 10, { message: 'Please enter more details.' });
	});

	constructor() {}

	async handleVerify() {
		if (this.inputForm.query().invalid()) {
			return;
		}

		await this.fdaService.verify(this.inputForm.query().value());
		this.fdaService.fdaResource.reload();
	}
}
