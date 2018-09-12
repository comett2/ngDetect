import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CardCollectorService {

	cards = [];

	private cards$ = new Subject();

	constructor() {

	}

	addCard(id: number): void {
		if (id === undefined) {
			id = 1;
		}
		this.cards.push(id);
		this.cards$.next(this.cards);
	}

	removeCard(id: number): void {
		let index = this.cards.findIndex(c => c === id);
		this.cards.splice(index, 1);
	}

	selectCards(): Observable<any> {
		return this.cards$.asObservable();
	}
}
