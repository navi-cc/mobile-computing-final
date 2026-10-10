import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular';
import { auth } from '../firebase';

@Component({
	selector: 'app-tab3',
	templateUrl: 'profile.page.html',
	styleUrls: ['profile.page.scss'],
	imports: [IonIcon, IonContent]
})
export class ProfilePage {
	// TO DO
	constructor() {}
}
