import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	IonContent,
	IonHeader,
	IonInput,
	IonRippleEffect,
	IonTitle,
	IonToolbar
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { AuthService } from '../../auth.service';
import { minLength, email, form, FormField } from '@angular/forms/signals';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.page.html',
	styleUrls: ['./sign-up.page.scss'],
	imports: [
		IonContent,
		IonInput,
		IonRippleEffect,
		CommonModule,
		FormsModule,
		FormField,
		SpinnerComponent
	]
})
export class SignUpPage {
	private router = inject(Router);

	private route = inject(ActivatedRoute);

	signInModel = signal({
		username: '',
		email: '',
		password: ''
	});

	signUpForm = form(this.signInModel, (schema) => {
		email(schema.email, { message: 'Please enter your email.' });
		minLength(schema.password, 5, { message: 'Please enter more details.' });
		minLength(schema.username, 5, { message: 'Please enter more details.' });
	});

	private authService = inject(AuthService);

	authMutation = injectMutation(() => ({
		mutationFn: async (data: { username: string; email: string; password: string }) => {
			const result = this.authService.signUp(data.username, data.email, data.password);

			return result;
		},
		onSuccess: () => {
			this.router.navigate(['auth'], { replaceUrl: true });
		}
	}));

	handleSignUp() {
		if (this.signUpForm().invalid()) {
			return;
		}

		const data = this.signUpForm().value();

		this.authMutation.mutate(data);
	}

	handleGoSignIn() {
		this.router.navigate(['auth']);
	}
}
