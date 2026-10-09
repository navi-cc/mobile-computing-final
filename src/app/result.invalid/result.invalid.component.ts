import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon, IonRippleEffect } from '@ionic/angular';
import { ResultPage } from '../result/result.page';

type Result = {
	name: string;
	verification_check_date: string;
	is_invalid: boolean;
};

@Component({
	selector: 'app-result-invalid',
	templateUrl: './result.invalid.component.html',
	styleUrls: ['./result.invalid.component.scss'],
	imports: [IonRippleEffect, IonIcon]
})
export class ResultInvalidComponent {
	private router = inject(Router);

	result = input.required<Partial<Result>>();
	constructor() {}

	handleBack() {
		this.router.navigate(['']);
	}
}
