import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRouterOutlet } from '@ionic/angular';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.page.html',
	styleUrls: ['./auth.page.scss'],
	imports: [IonContent, IonRouterOutlet, CommonModule, FormsModule]
})
export class AuthPage {}
