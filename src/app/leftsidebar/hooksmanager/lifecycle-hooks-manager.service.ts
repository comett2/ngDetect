import { Injectable } from '@angular/core';
import { Hook } from './Hook';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class LifecycleHooksManagerService {

	private hooks: Array<Hook> = [
		new Hook('OnInit', true, '#afff4b'),
		new Hook('OnDestroy', true, 'red'),
		new Hook('OnChanges', true, '#ffaf31'),
		new Hook('DoCheck', true, '#00d8ff'),
		new Hook('AfterViewInit', true, '#c989ff'),
		new Hook('AfterViewChecked', true, '#ff7f65'),
		new Hook('AfterContentInit', true, '#ffc907'),
		new Hook('AfterContentChecked', true, '#0505ff')];
	private hooks$ = new ReplaySubject<Array<Hook>>(1);

	constructor() {
		this.hooks$.next(this.hooks);
	}

	getHooks(): Observable<Array<Hook>> {
		return this.hooks$.asObservable();
	}

	toggleHook(hook: Hook): void {
		let hookIndex = this.hooks.indexOf(hook);
		this.hooks[hookIndex].enabled = !this.hooks[hookIndex].enabled;
		this.hooks$.next(this.hooks);
	}

	setHook(hook: Hook, value: boolean) {
		let hookIndex = this.hooks.indexOf(hook);
		this.hooks[hookIndex].enabled = value;
		this.hooks$.next(this.hooks);
	}

	isActive(hookName: string): boolean {
		let find = this.hooks.find((hook: Hook) => hook.name === hookName);
		return find.enabled;
	}
}