import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';
import { Cycle } from '../../streammanager/Cycle';

@Component({
	selector: 'sp-player',
	templateUrl: `PlayerComponent.html`,
	styleUrls: [`PlayerComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

	visible: boolean;
	private stackLength: number;
	private existsPrevious: boolean;
	private existsNext: boolean;

	constructor(private streamManager: LifecycleStreamManager,
				private changeDetectorRef: ChangeDetectorRef) {

	}

	ngOnInit() {
		this.streamManager
			.onStackFilling()
			.subscribe((stack: Array<Cycle>) => {
				this.stackLength = stack.length;
				this.visible = this.stackLength > 1;
				this.existsNext = true;
				this.changeDetectorRef.detectChanges();
			});
		this.streamManager
			.onStackRelease()
			.subscribe((cycle: Cycle) => {
				this.existsPrevious = this.streamManager.getReleaseIndex() > 0;
				this.existsNext = this.stackLength > this.streamManager.getReleaseIndex();
				this.changeDetectorRef.detectChanges();
			});
	}

	previous(): void {
		if (!this.existsPrevious) {
			return;
		}
		this.streamManager.previus();
	}

	next(): void {
		if (!this.existsNext) {
			return;
		}
		this.streamManager.next();
	}
}
