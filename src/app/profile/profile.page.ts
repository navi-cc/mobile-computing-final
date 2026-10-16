import { Component, inject } from '@angular/core';
import { IonContent, IonIcon, IonRippleEffect } from '@ionic/angular';
import { auth } from '../firebase';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tab3',
	templateUrl: 'profile.page.html',
	styleUrls: ['profile.page.scss'],
	imports: [IonIcon, IonContent, IonRippleEffect, SpinnerComponent]
})
export class ProfilePage {
	// TO DO

	userService = inject(UserService);

	authService = inject(AuthService);
	router = inject(Router);

	readonly signOutMutation = injectMutation(() => ({
		mutationFn: async () => {
			await this.authService.signOut();
			return true;
		},
		onSuccess: () => {
			this.router.navigate(['auth']);
		},
		onError: (err) => {
			console.log(err);
		}
	}));

	constructor() {}

	handleSignOut() {
		this.signOutMutation.mutate();
	}
}
