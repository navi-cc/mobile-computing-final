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
	selector: 'app-result-expired',
	templateUrl: './result.expired.component.html',
	styleUrls: ['./result.expired.component.scss'],
	imports: [IonRippleEffect, IonIcon]
})
export class ResultExpiredComponent {
	private router = inject(Router);

	result = input.required<Partial<Result>>();
	constructor() {}

	handleBack() {
		this.router.navigate(['']);
	}
}
