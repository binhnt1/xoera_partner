import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef, Inject } from '@angular/core';

@Directive({
    selector: '[mvc-click-outside]'
})

export class MvcClickOutsideDirective implements OnInit, OnDestroy {
    private listening: boolean;
    private globalClick: any = null;

    @Output('clickOutside') clickOutside: EventEmitter<Object>;

    constructor(
        private _elRef: ElementRef, 
        @Inject(PLATFORM_ID) private platformId: Object) {
        this.listening = false;
        this.clickOutside = new EventEmitter();
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.globalClick = Observable
                .fromEvent(document, 'click')
                .delay(1)
                .do(() => {
                    this.listening = true;
                }).subscribe((event: MouseEvent) => {
                    this.onGlobalClick(event);
                });
        }
    }

    ngOnDestroy() {
        if (this.globalClick)
            this.globalClick.unsubscribe();
    }

    onGlobalClick(event: MouseEvent) {
        if (event instanceof MouseEvent && this.listening === true) {
            if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
                this.clickOutside.emit({
                    target: (event.target || null),
                    value: false,
                    e: event,
                });
            } else {
                this.clickOutside.emit({
                    target: (event.target || null),
                    value: true,
                    e: event,
                });
            }
        }
    }

    isDescendant(parent: any, child: any) {
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            } else {
                node = node.parentNode;
            }
        }
        return false;
    }
}
