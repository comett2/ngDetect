import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'sp-divider',
	templateUrl: `DividerComponent.html`,
	styleUrls:[`DividerComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent implements OnInit {

	@Input()
	text: string;

	constructor() {

	}

	ngOnInit() {

	}


}
