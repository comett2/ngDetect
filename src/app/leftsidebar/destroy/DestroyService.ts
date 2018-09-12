import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LinkManager } from '../../link/LinkManager';

@Injectable()
export class DestroyService {

	private destroy$ = new Subject<number>();

	constructor() {

	}

	destroy(id: number) {
		this.destroy$.next(id);
	}

	selectDestroy(): Observable<number> {
		return this.destroy$.asObservable();
	}
}
