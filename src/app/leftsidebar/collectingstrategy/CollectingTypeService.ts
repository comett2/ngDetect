import { Injectable } from '@angular/core';
import { CollectingType } from './CollectingType';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CollectingTypeService {

	private changed$ = new Subject();
	private type: CollectingType = CollectingType.LIVE;

	constructor() {

	}

	change(type: CollectingType): void {
		this.type = type;
	}

	isLive(): boolean {
		return this.type === CollectingType.LIVE;
	}

	getType(): CollectingType {
		return this.type;
	}
}