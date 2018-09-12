import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CollectingType } from './CollectingType';
import { CollectingTypeService } from './CollectingTypeService';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';

@Component({
	selector: 'sp-collecting-type',
	templateUrl: `CollectingTypeComponent.html`,
	styleUrls: [`CollectingTypeComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectingTypeComponent implements OnInit {

	private type: CollectingType;
	started: boolean = false;
	label = 'collecting strategy';

	constructor(private collectingTypeService: CollectingTypeService,
				private lifecycleStreamManager: LifecycleStreamManager,
				private changeDetectorRef: ChangeDetectorRef) {
		this.type = this.collectingTypeService.getType();
	}

	ngOnInit() {

	}

	select(type: CollectingType): void {
		this.type = type;
		this.collectingTypeService.change(type);
	}

	isStartEndType(): boolean {
		return this.collectingTypeService.getType() === CollectingType.START_END;
	}

	selectLive(): void {
		this.select(CollectingType.LIVE);
	}

	selectStartEnd(): void {
		this.select(CollectingType.START_END);
	}

	start(): void {
		this.started = true;
		this.lifecycleStreamManager.start();
		this.changeDetectorRef.detectChanges();
	}

	release(): void {
		this.started = false;
		this.lifecycleStreamManager.release();
		this.changeDetectorRef.detectChanges();
	}
}