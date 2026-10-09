import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon, IonRippleEffect } from '@ionic/angular';

type Result = {
	company: string;
	is_expired: boolean;
	notification_number: string;
	product: string;
	product_validity_date: string;
	verification_check_date: string;
};

@Component({
	selector: 'app-result-active',
	templateUrl: './result.active.component.html',
	styleUrls: ['./result.active.component.scss'],
	imports: [IonRippleEffect, IonIcon]
})
export class ResultActiveComponent {
	private router = inject(Router);

	result = input.required<Partial<Result>>();
	constructor() {}

	handleBack() {
		this.router.navigate(['']);
	}
}
