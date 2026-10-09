import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	IonContent,
	IonHeader,
	IonIcon,
	IonRippleEffect,
	IonTitle,
	IonToolbar
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultActiveComponent } from '../result.active/result.active.component';
import { ResultExpiredComponent } from '../result.expired/result.expired.component';
import { ResultInvalidComponent } from '../result.invalid/result.invalid.component';

type ApiResult = {
	company: string;
	is_expired: boolean;
	notification_number: string;
	product: string;
	product_validity_date: string;
	verification_check_date: string;
	is_invalid: boolean;
};

@Component({
	selector: 'app-result',
	templateUrl: './result.page.html',
	styleUrls: ['./result.page.scss'],
	imports: [
		IonContent,
		CommonModule,
		FormsModule,
		ResultActiveComponent,
		ResultExpiredComponent,
		ResultInvalidComponent
	]
})
export class ResultPage implements OnInit {
	private route = inject(ActivatedRoute);
	private router = inject(Router);

	result = signal<Partial<ApiResult>>({});

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			const data = JSON.parse(params['data'] as string) as ApiResult;

			this.result.update(() => data);
		});
	}

	handleBack() {
		// this.router.navigate(['']);
	}
}
