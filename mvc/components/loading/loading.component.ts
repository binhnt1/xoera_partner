import { Component, OnInit, Input } from "@angular/core";

@Component({
    styleUrls: ['./loading.scss'],
    selector: 'mvc-loading-component',
    templateUrl: './loading.component.html'
})
export class MvcLoadingComponent implements OnInit {
    @Input() icon: string;
    @Input() text: string;
    @Input() overlay: boolean;

    ngOnInit() {
        if (!this.text) this.text = 'Loading...';
        if (this.overlay == null) this.overlay = true;
    }
}
