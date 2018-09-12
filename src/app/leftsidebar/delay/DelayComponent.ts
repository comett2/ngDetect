import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DelayService } from './DelayService';
import { DelayType } from './DelayType';

@Component({
	selector: 'sp-delay',
	templateUrl: `DelayComponent.html`,
	styleUrls: [`DelayComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DelayComponent implements OnInit {

	label = 'delay';
	form: any;
	type: DelayType;

	constructor(private formBuilder: FormBuilder,
				private delayService: DelayService,
				private changeDetectorRef: ChangeDetectorRef) {

	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			'delay': [this.delayService.getDelay(), [Validators.required, Validators.max(10), Validators.min(0)]]
		});
		this.form.valueChanges
			.subscribe(form => {
				this.delayService.setDelay(form.delay);
			});

		this.delayService
			.getDelayType()
			.subscribe((type: DelayType) => {
				this.type = type;
				console.log(this.isDelayTime())
				console.log(this.isDelayStepByStep())
				this.changeDetectorRef.detectChanges();
			});
	}

	selectTimeType(type: DelayType): void {
		this.delayService.setDelayType(DelayType.TIME);
	}

	selectStepByStep(type: DelayType): void {
		this.delayService.setDelayType(DelayType.STEP_BY_STEP);
	}

	isDelayTime(): boolean {
		console.log('istoime')
		console.log(this.type === DelayType.TIME)
		return this.type === DelayType.TIME;
	}

	isDelayStepByStep(): boolean {
		return this.type === DelayType.STEP_BY_STEP;
	}
}
