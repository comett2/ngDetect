import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';
import { Cycle } from '../../streammanager/Cycle';
import { TimelineElement } from './element/TimelineElement';

@Component({
	selector: 'sp-timeline',
	templateUrl: `TimelineComponent.html`,
	styleUrls: [`TimelineComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {

	elements: Array<TimelineElement> = [];
	cycles: Array<Cycle> = [];
	private availableSpace: number;

	constructor(private lifecycleStreamManager: LifecycleStreamManager,
				private changeDetectorRef: ChangeDetectorRef,
				private elementRef: ElementRef,
				private renderer: Renderer2) {

	}

	ngOnInit() {
		this.lifecycleStreamManager
			.onStackRelease()
			.subscribe((cycle: Cycle) => {
				this.cycles.push(cycle);
				this.changeDetectorRef.detectChanges();
				this.availableSpace = this.elementRef.nativeElement.offsetWidth - 50;
				this.createElements();
			});
	}

	getDateTimeMaxDiff(): number {
		return this.cycles[this.cycles.length - 1].date.getTime() - this.cycles[0].date.getTime();
	}

	getDateTimeDiff(date: Date): number {
		return date.getTime() - this.cycles[0].date.getTime();
	}

	createElements(): void {
		this.elements = [];
		this.cycles.forEach((cycle: Cycle) => {
			this.elements.push(new TimelineElement(cycle, (this.getDateTimeDiff(cycle.date)/this.getDateTimeMaxDiff()*this.availableSpace) + 'px'));
		});
		this.changeDetectorRef.detectChanges();
	}
}
