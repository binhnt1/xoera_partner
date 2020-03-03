import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[mvc-scroll-tracker]'
})

export class MvcScrollTrackerDirective {
    @Output('scrollToEnd') scrollToEnd: EventEmitter<Object>;
    @HostListener('scroll', ['$event']) onScroll(event: any) {
        const tracker = event.target,
            limit = tracker.scrollHeight - tracker.clientHeight;
        if (event.target.scrollTop === limit) {
            if (!this.scrollToEnd)
                this.scrollToEnd = new EventEmitter();
            this.scrollToEnd.emit();
        }
    }

    constructor() {
        this.scrollToEnd = new EventEmitter();
     }
}
