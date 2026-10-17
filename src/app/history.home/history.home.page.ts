import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FdaService } from '../fda/fda.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HistoryCardComponent } from '../history.card/history.card.component';

@Component({
	selector: 'app-history.home',
	templateUrl: './history.home.page.html',
	styleUrls: ['./history.home.page.scss'],
	imports: [CommonModule, FormsModule, HistoryCardComponent]
})
export class HistoryHomePage {
	fdaService = inject(FdaService);

	readonly fdaQuery = injectQuery(() => ({
		queryFn: async () => {
			const items = await this.fdaService.get();

			console.log('items', items);

			return items;
		},
		queryKey: ['items']
	}));
}
