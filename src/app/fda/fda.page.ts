import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';

@Component({
	selector: 'app-tab1',
	templateUrl: 'fda.page.html',
	styleUrls: ['fda.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class FdaPage {
	constructor() {}
}
