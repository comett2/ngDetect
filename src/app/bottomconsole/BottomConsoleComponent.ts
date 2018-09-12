import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DelayService } from '../leftsidebar/delay/DelayService';
import { DelayType } from '../leftsidebar/delay/DelayType';

@Component({
	selector: 'sp-bottom-console',
	templateUrl: `BottomConsoleComponent.html`,
	styleUrls: [`BottomConsoleComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomConsoleComponent implements OnInit {

	playerVisible: boolean;

	constructor(private delayService: DelayService,
				private changeDetectorRef: ChangeDetectorRef) {

	}

	ngOnInit() {
		this.delayService
			.getDelayType()
			.subscribe((type: DelayType) => {
				this.playerVisible = type === DelayType.STEP_BY_STEP;
				this.changeDetectorRef.detectChanges();
			});
	}


}
