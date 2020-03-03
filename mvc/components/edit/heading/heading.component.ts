import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { ActionData } from "../../../domains/data/action.data";
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { MvcEventService } from "../../../../mvc/services/event.service";

@Component({
    selector: 'edit-heading',
    styleUrls: ['./heading.scss'],
    templateUrl: './heading.component.html',
})
export class EditHeadingComponent implements OnInit, OnDestroy {
    object: any;
    @Input() tools: ActionData[];
    @Input() actions: ActionData[];
    subscribeEditEntity: Subscription;

    constructor(
        public router: Router,
        public event: MvcEventService) {
        if (!this.subscribeEditEntity) {
            this.subscribeEditEntity = this.event.EditEntity.subscribe((object: any) => {
                this.object = object;
            })
        }
    }

    ngOnInit() {
        setTimeout(() => {
            (<any>jQuery('.tooltips')).tooltip();
            if (this.actions && this.actions.length > 0) {
                this.actions.forEach((action: ActionData) => {
                    if (action.confirm) {
                        (<any>jQuery('.confirmation')).confirmation({
                            onConfirm: () => {
                                if (action.confirm.buttons[0].click)
                                    action.confirm.buttons[0].click();
                            },
                            onCancel: () => {
                                if (action.confirm.buttons[1].click)
                                    action.confirm.buttons[1].click();
                            },
                        });
                    }
                });
            }
            if (this.tools && this.tools.length > 0) {
                this.tools.forEach((action: ActionData) => {
                    if (action.confirm) {
                        (<any>jQuery('.tool-confirmation')).confirmation({
                            onConfirm: () => {
                                if (action.confirm.buttons[0].click)
                                    action.confirm.buttons[0].click();
                            },
                            onCancel: () => {
                                if (action.confirm.buttons[1].click)
                                    action.confirm.buttons[1].click();
                            },
                        });
                    }
                });
            }
        }, 1000);
    }

    ngOnDestroy() {
        if (this.subscribeEditEntity) {
            this.subscribeEditEntity.unsubscribe();
            this.subscribeEditEntity = null;
        }
    }
}
