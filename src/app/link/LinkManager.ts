import { Injectable } from '@angular/core';
import { Link } from './Link';

@Injectable()
export class LinkManager {

	private links: Array<Link> = [];

	constructor() {

	}

	addLink(link: Link): void {
		this.links.push(link);
		this.drawLink(link);
	}

	getCentreOfElement(el) {
		var bounds = el.getBoundingClientRect();
		return {
			x: bounds.left + bounds.width / 2.0,
			y: bounds.top + bounds.height / 2.0
		};
	}

	drawLink(link: Link): void {
		var canvas = document.getElementById('canvas');
		var ctx = canvas['getContext']('2d');
		ctx.clearRect(0, 0, canvas['width'], canvas['height']);
		setTimeout(() => {
			this.links.forEach((link: Link) => {
				this.draw(link, ctx);
			});
		}, 100);
	}

	redraw() {
		var canvas = document.getElementById('canvas');
		var ctx = canvas['getContext']('2d');
		ctx.clearRect(0, 0, canvas['width'], canvas['height']);
		setTimeout(() => {
			this.links.forEach((link: Link) => {
				this.draw(link, ctx);
			});
		},100);
	}

	removeLink(link: Link): void {
		let indexToDelete = this.links.findIndex((l: Link) => link.endEl === l.endEl && link.startEl === l.startEl);
		this.links.splice(indexToDelete,1);
		this.redraw();
	}

	private draw(link: Link, context): void {
		let start = this.getCentreOfElement(link.startEl);
		context.beginPath();
		context.moveTo(start.x, start.y);
		let end = this.getCentreOfElement(link.endEl);
		context.lineTo(end.x, end.y);
		context.stroke();
	}
}


