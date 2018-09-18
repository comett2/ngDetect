import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Code } from './Code';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CodeRunnerService {

	private code$ = new Subject<Code>();

	constructor() {

	}

	run(id: number, code: string): void {
		this.code$.next(new Code(id, code));
	}

	onRun(): Observable<Code> {
		return this.code$.asObservable();
	}
}
