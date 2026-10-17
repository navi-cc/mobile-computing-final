import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryHomePage } from './history.home.page';

describe('HistoryHomePage', () => {
	let component: HistoryHomePage;
	let fixture: ComponentFixture<HistoryHomePage>;

	beforeEach(() => {
		fixture = TestBed.createComponent(HistoryHomePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
