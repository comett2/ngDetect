import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		
		<sp-left-sidebar></sp-left-sidebar>
		<canvas id="canvas"
				style="position:fixed; top:0"
				class="canvas">
			
		</canvas>
		<card-root class="root-card"></card-root>
		<sp-bottom-console></sp-bottom-console>
		<sp-stop></sp-stop>
	`,
	styles: [`
		:host {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: Arial;
		}

		/*.canvas {*/
			/*height: 100%;*/
			/*width: 100%;*/
			/*position: fixed;*/
		/*}*/

		.app-container {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.root-card {
			z-index: 10;
		}
	`]
})
export class AppComponent implements AfterViewInit {
	private canvasWidth: number;
	private canvasHeight: number;


	ngAfterViewInit() {
		var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
		this.canvasWidth = dimension[0];
		this.canvasHeight = dimension[1];
		var canvasObject = document.getElementById('canvas');

		canvasObject['width'] = this.canvasWidth
		canvasObject['height'] = this.canvasHeight;
	}
}
