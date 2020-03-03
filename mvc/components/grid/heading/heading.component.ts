import { Router } from "@angular/router";
import { Component, Input } from "@angular/core";
import { ActionData } from "../../../domains/data/action.data";
import { MvcEventService } from "../../../../mvc/services/event.service";

@Component({
    selector: 'grid-heading',
    styleUrls: ['./heading.scss'],
    templateUrl: './heading.component.html',
})
export class GridHeadingComponent {
    @Input() tools: ActionData[];
    @Input() actions: ActionData[];

    constructor(
        public router: Router,
        public event: MvcEventService) {
    }
}
