declare var jQuery;
import { Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { AppConfig } from "../../../../mvc/helpers/app.config";
import { ActionData } from "../../../domains/data/action.data";
import { MvcEventService } from "../../../../mvc/services/event.service";

@Component({
    selector: 'grid-action',
    styleUrls: ['./action.scss'],
    templateUrl: './action.component.html',
})
export class GridActionComponent implements OnInit {
    @Input() object: any;
    @Input() property: string;
    @Input() controller: string;
    @Input() actions: ActionData[];


    constructor(
        public router: Router,
        public event: MvcEventService) {
    }

    ngOnInit() {
        if (!this.property) this.property = 'Id';
        let id = this.object[this.property];
        if (!this.actions) {
            this.actions = [];
            this.actions.push(ActionData.gridEdit(this.router, id, this.controller));            
            if (AppConfig.EnableActive) {
                this.actions.push(ActionData.gridInActive(this.router, id));
            } 
            if (AppConfig.EnableDeleted) {
                this.actions.push(ActionData.gridDelete(() => {
                    this.event.Delete.emit(this.object);
                }));
            }
        }
        setTimeout(() => {
            (<any>jQuery('.tooltips')).tooltip();
            this.actions.forEach((action: ActionData) => {
                if (action.confirm) {
                    (<any>jQuery('#' + id + '-grid-confirmation')).confirmation({
                        onConfirm: () => {
                            if (action.confirm.buttons[0].click)
                                action.confirm.buttons[0].click();
                        },
                        onCancel: () => {
                            if (action.confirm.buttons[1].click)
                                action.confirm.buttons[1].click();
                        },
                    });
                    (<any>jQuery('#' + id + '-grid-confirmation')).click(() => {
                        (<any>jQuery)('.bs-tooltip-top').remove();
                    });
                }
            });
        }, 1000);
    }
}
