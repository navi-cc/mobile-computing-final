import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';

@Component({
	selector: 'app-tab3',
	templateUrl: 'profile.page.html',
	styleUrls: ['profile.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ProfilePage {
	constructor() {}
}
