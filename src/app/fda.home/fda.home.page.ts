import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonIcon,
	IonRouterOutlet
} from '@ionic/angular';
import { FdaService } from '../fda/fda.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { Router } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';

@Component({
	selector: 'app-fda.home',
	templateUrl: './fda.home.page.html',
	styleUrls: ['./fda.home.page.scss'],
	imports: [IonIcon, FormField, LottieComponent, IonContent]
})
export class FdaHomePage {
	private router = inject(Router);
	fdaService = inject(FdaService);
	fdaVerifyMutation = injectMutation(() => ({
		mutationFn: async (q: string) => this.fdaService.verify(q),
		onSuccess: (result) => {
			this.router.navigate([`/fda/result/${Date.now()}`], {
				queryParams: {
					data: JSON.stringify(result.data)
				}
			});
		}
	}));
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

		this.fdaVerifyMutation.mutate(this.inputForm.query().value());
	}
}
