import { Injectable } from '@angular/core';
import { DelayType } from './DelayType';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DelayService {

	private delay: number = 100;

	private delayType: DelayType = DelayType.TIME;
	private delayType$ = new BehaviorSubject(this.delayType);

	constructor() {

	}

	setDelay(value: number): void {
		this.delay = value;
	}

	getDelay(): number {
		return this.delay;
	}

	setDelayType(type: DelayType): void {
		this.delayType = type;
		this.delayType$.next(type);
	}

	getDelayType(): Observable<DelayType> {
		return this.delayType$.asObservable();
	}
}
