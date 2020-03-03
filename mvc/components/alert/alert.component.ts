import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'mvc-alert-component',
  templateUrl: './alert.component.html'
})
export class MvcAlertComponent {
    @Input() icon: string;
    @Input() text: string;
    @Output() closed: EventEmitter<any> = new EventEmitter();

    public close() {
        this.closed.emit();
    }
}
