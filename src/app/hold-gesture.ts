import {
	Directive,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output
} from '@angular/core';
import { GestureController, Gesture } from '@ionic/angular';

@Directive({
	selector: '[appHoldGesture]'
})
export class HoldGestureDirective implements OnInit {
	@Output() holdEmitted = new EventEmitter<any>();
	@Input() holdDuration: number = 500;

	private holdTimeout: any;
	private gesture!: Gesture;

	private el = inject(ElementRef);
	private gestureCtrl = inject(GestureController);

	ngOnInit() {
		this.gesture = this.gestureCtrl.create({
			el: this.el.nativeElement,
			threshold: 0,
			gestureName: 'hold-gesture',
			onStart: (ev) => this.onStart(ev),
			onEnd: () => this.onEnd(),
			onMove: (ev) => this.onMove(ev)
		});

		this.gesture.enable(true);
	}

	private onStart(ev: any) {
		this.holdTimeout = setTimeout(() => {
			this.holdEmitted.emit(ev);
		}, this.holdDuration);
	}

	private onEnd() {
		if (this.holdTimeout) {
			clearTimeout(this.holdTimeout);
		}
	}

	private onMove(ev: any) {
		if (Math.abs(ev.deltaX) > 10 || Math.abs(ev.deltaY) > 10) {
			this.onEnd();
		}
	}
}
