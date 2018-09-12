import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LifecycleStreamManager } from '../streammanager/LifecycleStreamManager';
import { DelayType } from '../leftsidebar/delay/DelayType';
import { DelayService } from '../leftsidebar/delay/DelayService';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'sp-stop',
	templateUrl: `StopComponent.html`,
	styleUrls: [
		'StopComponent.css'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopComponent implements OnInit, OnDestroy {

	visible: boolean;

	private stackLength: number;
	private stepByStep: boolean;
	private destroy$ = new Subject();

	constructor(private lifecycleStreamManager: LifecycleStreamManager,
				private changeDetectorRef: ChangeDetectorRef,
				private delayService: DelayService) {

	}

	ngOnInit() {
		this.lifecycleStreamManager
			.onStackRelease()
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				if (this.stepByStep) {
					this.stackLength =
						this.lifecycleStreamManager.getStackLength() - this.lifecycleStreamManager.getReleaseIndex();
				}  else {
					this.stackLength = this.lifecycleStreamManager.getStackLength();
				}
				this.visible = this.stackLength > 1;
				this.changeDetectorRef.detectChanges();
			});

		this.lifecycleStreamManager
			.onStackFilling()
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				if (this.lifecycleStreamManager.getStackLength() === 0) {
					this.visible = false;
					this.changeDetectorRef.detectChanges();
				}
			});

		this.delayService
			.getDelayType()
			.pipe(takeUntil(this.destroy$))
			.subscribe((type: DelayType) => {
				this.stepByStep = type === DelayType.STEP_BY_STEP;
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
	}

	stop() {
		this.lifecycleStreamManager.cleanStack();
	}
}
