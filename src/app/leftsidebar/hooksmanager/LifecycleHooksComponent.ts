import { Component, NgZone, OnInit } from '@angular/core';
import { LifecycleHooksManagerService } from './lifecycle-hooks-manager.service';
import { Hook } from './Hook';
import { LifecycleStreamManager } from '../../streammanager/LifecycleStreamManager';

@Component({
	selector: 'lifecycle-hooks',
	templateUrl: `./LifecycleHooksComponent.html`,
	styleUrls: [
		'LifecycleHooksComponent.css'
	],
})
export class LifecycleHooksComponent implements OnInit {

	hooks: Array<Hook>;
	label = 'lifecycle hooks';
	allHooksChecked: boolean;

	constructor(private lifecycleHooksManagerService: LifecycleHooksManagerService,
				private lifecycleStreamManager: LifecycleStreamManager,
				private zone: NgZone) {
	}

	ngOnInit() {
		this.lifecycleHooksManagerService.getHooks()
			.subscribe((hooks: Array<Hook>) => {
				this.hooks = hooks;
			});
	}

	toggle(hook: Hook): void {
		this.lifecycleHooksManagerService.toggleHook(hook);
	}

	start(): void {
		this.zone.runOutsideAngular(() => {
			this.lifecycleStreamManager.start();
		});
	}

	allHooksClicked() {
		this.hooks.forEach((hook: Hook) => {
			this.lifecycleHooksManagerService.setHook(hook, !this.allHooksChecked);
		});
		this.allHooksChecked = !this.allHooksChecked;
	}
}
