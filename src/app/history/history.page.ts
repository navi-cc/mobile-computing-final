import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';

@Component({
	selector: 'app-tab2',
	templateUrl: 'history.page.html',
	styleUrls: ['history.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class HistoryPage {
	constructor() {}
}
