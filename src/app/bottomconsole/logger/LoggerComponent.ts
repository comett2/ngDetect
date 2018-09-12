import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';
import { Cycle } from '../../streammanager/Cycle';

@Component({
	selector: 'sp-logger',
	templateUrl: `LoggerComponent.html`,
	styleUrls: [`LoggerComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggerComponent implements OnInit {

	@ViewChild('scrollContainer') elementRef: ElementRef;

	cycles: Array<Cycle> = [];

	constructor(private lifecycleStreamManager: LifecycleStreamManager,
				private changeDetectorRef: ChangeDetectorRef) {

	}

	ngOnInit() {
		this.lifecycleStreamManager
			.onStackRelease()
			.subscribe((cycle: Cycle) => {
				this.cycles.push(cycle);
				this.changeDetectorRef.detectChanges();
				this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
			});
	}
}
