import { Component, Directive, EventEmitter, Output } from '@angular/core';
import { CardCreationEvent } from './CardCreationEvent';

@Component({
	selector: 'card-creation-actions',
	template: `
		<div #buttons
			 class="buttons">
			<button class="k-button fas fa-recycle"
					(click)="addDefaultCard()">
			</button>
			<button class="k-button fas fa-hand-paper"
					(click)="addOnPushCard()">
			</button>
			<button class="k-button fas fa-trash-alt"
					(click)="destroy()">
			</button>
		</div>
	`,
	styles: [`
		.buttons {
			display: flex;
			justify-content: space-around;
		}

		.k-button {
			font-size: 14px;
			border-radius: 50%;
			height: 32px;
			width: 32px;
			cursor: pointer;
			color: black;
			transition: all 0.1s;
		}

		.k-button:hover {
			box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
		}
	`]
})
export class CardCreationActionsComponent {

	@Output('action')
	action$: EventEmitter<CardCreationEvent> = new EventEmitter<CardCreationEvent>();

	constructor() {
	}

	addDefaultCard(): void {
		this.action$.emit(CardCreationEvent.NEW_DEFUALT);
	}

	addOnPushCard(): void {
		this.action$.emit(CardCreationEvent.NEW_ONPUSH);
	}

	destroy(): void {
		this.action$.emit(CardCreationEvent.DELETE);
	}
}
