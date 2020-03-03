import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'layout-metronic-subheader',
    templateUrl: 'subheader.component.html'
})
export class LayoutMetronicSubHeaderComponent {
    title: string;

    constructor(public route: ActivatedRoute) {
        let firstChild = this.route.snapshot.firstChild,
            data = firstChild && firstChild.data;
        this.title = data && data.title;
    }
}
