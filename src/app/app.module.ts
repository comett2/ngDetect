import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegularCard } from './card/regular-card.component';
import { OnpushCardComponent } from './card/onpush-card.component';
import { LifecycleHooksManagerService } from './leftsidebar/hooksmanager/lifecycle-hooks-manager.service';
import { CardCreationActionsComponent } from './card/cardcreationactions/card-creation-actions.component';
import { LifecycleStreamManager } from './streammanager/LifecycleStreamManager';
import { CollectingTypeComponent } from './leftsidebar/collectingstrategy/CollectingTypeComponent';
import { CardRootComponent } from './card/CardRootComponent';
import { CollectingTypeService } from './leftsidebar/collectingstrategy/CollectingTypeService';
import { LeftSidebarComponent } from './leftsidebar/LeftSidebarComponent';
import { LifecycleHooksComponent } from './leftsidebar/hooksmanager/LifecycleHooksComponent';
import { DividerComponent } from './leftsidebar/divider/DividerComponent';
import { DelayComponent } from './leftsidebar/delay/DelayComponent';
import { DelayService } from './leftsidebar/delay/DelayService';
import { PlayerComponent } from './bottomconsole/player/PlayerComponent';
import { BottomConsoleComponent } from './bottomconsole/BottomConsoleComponent';
import { TimelineComponent } from './bottomconsole/timeline/TimelineComponent';
import { LoggerComponent } from './bottomconsole/logger/LoggerComponent';
import { LinkManager } from './link/LinkManager';
import { DestroyComponent } from './leftsidebar/destroy/DestroyComponent';
import { DestroyService } from './leftsidebar/destroy/DestroyService';
import { StopComponent } from './stop/StopComponent';
import { CodeInputComponent } from './bottomconsole/codeinput/CodeInputComponent';
import { CardCollectorService } from './CardCollectorService';
import { CodeRunnerService } from './bottomconsole/codeinput/CodeRunnerService';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		RegularCard,
		OnpushCardComponent,
		LifecycleHooksComponent,
		CardCreationActionsComponent,
		CollectingTypeComponent,
		CardRootComponent,
		LeftSidebarComponent,
		DividerComponent,
		DelayComponent,
		PlayerComponent,
		BottomConsoleComponent,
		TimelineComponent,
		LoggerComponent,
		DestroyComponent,
		StopComponent,
		CodeInputComponent
	],
	providers: [
		LifecycleHooksManagerService,
		LifecycleStreamManager,
		CollectingTypeService,
		DelayService,
		LinkManager,
		DestroyService,
		CardCollectorService,
		CodeRunnerService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
