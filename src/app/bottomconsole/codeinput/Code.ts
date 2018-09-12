export class Code {

	constructor(public id: number,
				public code: (changeDetectorRef, elementRef) => void) {

	}
}