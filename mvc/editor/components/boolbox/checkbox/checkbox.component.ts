import "reflect-metadata";
import * as _ from "lodash";
import { Subscription } from "rxjs/Subscription";
import { MvcEventService } from '../../../../services/event.service';
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";

@Component({
    styleUrls: ['./checkbox.scss'],
    selector: 'editor-boolbox-checkbox',
    templateUrl: './checkbox.component.html',
})
export class EditorBoolBoxCheckboxComponent implements OnInit, OnDestroy {
    classAlign: string;
    classLabel: string;
    classInput: string;
    subscribeValidation: Subscription;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('objectChange') objectChange = new EventEmitter();

    constructor(public event: MvcEventService) {

    }

    ngOnInit() {
        if (this.decorator) {
            this.decorator = _.cloneDeep(this.decorator);
            this.classAlign = UtilityHelper.alignString(this.decorator.align);
        }

        // set default value
        if (!this.decorator.value && this.decorator.default) {
            this.decorator.value = _.cloneDeep(this.decorator.default);
            this.object[this.decorator.property] = this.decorator.value;
        }

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        // subscribe validate
        if (!this.subscribeValidation) {
            this.subscribeValidation = this.event.Validate.subscribe((item: ObjectEx) => {
                if (item.table == this.decorator.table &&
                    item.property == this.decorator.property) {
                    this.decorator.valid = item.valid;
                    this.decorator.message = item.message;
                }
            })
        }
    }

    ngOnDestroy() {
        if (this.subscribeValidation) {
            this.subscribeValidation.unsubscribe();
            this.subscribeValidation = null;
        }
    }

    valueChange() {
        this.decorator.valid = true;
        this.decorator.message = '';
        this.decorator.value = this.object[this.decorator.property];
    }
}
