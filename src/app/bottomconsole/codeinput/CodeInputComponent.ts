import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CardCollectorService } from '../../CardCollectorService';
import { CodeRunnerService } from './CodeRunnerService';

@Component({
	selector: 'sp-code-input',
	templateUrl: `CodeInputComponent.html`,
	styleUrls: [`CodeInputComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeInputComponent implements OnInit {

	@ViewChild('codeArea')
	codeArea: any;

	elements = [];
  selectedValue: any = 1;

	constructor(private cardCollectorService: CardCollectorService,
				private changeDetectorRef: ChangeDetectorRef,
				private codeRunnerService: CodeRunnerService) {

	}

	ngOnInit() {
		this.cardCollectorService
			.selectCards()
			.subscribe((elements) => {
				this.elements = elements;
				this.changeDetectorRef.detectChanges();
			});
	}

	run() {
		this.codeRunnerService.run(this.selectedValue, this.codeArea.nativeElement.value);
	}
}
