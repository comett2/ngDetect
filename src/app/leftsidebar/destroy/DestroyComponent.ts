import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DestroyService } from './DestroyService';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';

@Component({
	selector: 'sp-destroy',
	templateUrl: `DestroyComponent.html`,
	styleUrls: [`DestroyComponent.css`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestroyComponent implements OnInit {

	label: 'Destroy Component';

	id: number;

	constructor(private destroyService: DestroyService,
				private lifecycleStreamManager: LifecycleStreamManager) {

	}

	ngOnInit() {
		this.lifecycleStreamManager.onStackFilling()

	}

	destroy() {
		this.destroyService.destroy(this.id);
		this.lifecycleStreamManager.cleanStack();
	}
}
