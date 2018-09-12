import { Injectable, NgZone } from '@angular/core';
import { Cycle } from './Cycle';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LifecycleHooksManagerService } from '../leftsidebar/hooksmanager/lifecycle-hooks-manager.service';
import { CollectingTypeService } from '../leftsidebar/collectingstrategy/CollectingTypeService';
import { CollectingType } from '../leftsidebar/collectingstrategy/CollectingType';
import { DelayService } from '../leftsidebar/delay/DelayService';
import { DelayType } from '../leftsidebar/delay/DelayType';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LifecycleStreamManager {

	counter = 1;
	private stack: Array<Cycle> = [];
	private stackReleaser$ = new ReplaySubject<Cycle>(1);
	private stackFilling$ = new Subject<Array<Cycle>>();
	private started = false;

	private releaseInProgress;

	private delayType: DelayType;
	private releaseIndex: number = 0; //refactor;

	constructor(private zone: NgZone,
				private lifecycleHooksManagerService: LifecycleHooksManagerService,
				private collectingTypeService: CollectingTypeService,
				private delayService: DelayService) {

		this.delayService
			.getDelayType()
			.subscribe((type: DelayType) => {
				this.delayType = type;
				this.stack = [];
			});

	}

	hookFired(cycle: Cycle) {
		if (!this.lifecycleHooksManagerService.isActive(cycle.hookName)) {
			return;
		}
		cycle.withTime(new Date());
		this.stack.push(cycle);
		this.stackFilling$.next(this.stack);
		if (this.collectingTypeService.isLive() && this.delayType === DelayType.TIME) {
			this.releaseStack();
		}
	}

	onStackRelease(): Observable<Cycle> {
		return this.stackReleaser$
				   .asObservable();
	}

	onStackFilling(): Observable<Array<Cycle>> {
		return this.stackFilling$.asObservable();
	}

	start() {
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				this.started = true;
			}, 100);
		});
	}

	release(): void {
		this.releaseStack();
	}

	getStackLength(): number {
		return this.stack.length;
	}

	cleanStack(): void {
		this.stack = [];
		this.stackFilling$.next(this.stack);
	}

	private releaseStack(): void {
		if (this.releaseInProgress) {
			return;
		}
		this.releaseInProgress = true;
		let releaseStackInterval = setInterval(() => {
			if (this.stack.length === 0) {
				clearInterval(releaseStackInterval);
				this.releaseInProgress = false;
				return;
			}
			this.stackReleaser$.next(this.stack[0]);
			this.stack = this.stack.slice(1);
		}, this.delayService.getDelay());
	}

	next(): void {
		this.stackReleaser$.next(this.stack[this.releaseIndex]);
		this.releaseIndex++;
	}

	previus(): void {
		this.releaseIndex--;
		this.stackReleaser$.next(this.stack[this.releaseIndex]);
	}

	getReleaseIndex() {
		return this.releaseIndex;
	}
}