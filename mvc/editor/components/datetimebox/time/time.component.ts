import "reflect-metadata";
import * as _ from "lodash";
import { Subscription } from "rxjs/Subscription";
import { MvcEventService } from '../../../../services/event.service';
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { DateTimeType } from "../../../../../mvc/domains/enums/data.type";
import { DateTimeEx } from "../../../../../mvc/decorators/datetime.decorator";
import { Component, Input, AfterContentInit, Output, EventEmitter, DoCheck } from "@angular/core";

@Component({
    styleUrls: ['./time.scss'],
    selector: 'editor-datetimebox-time',
    templateUrl: './time.component.html',
})
export class EditorDateTimeBoxTimeComponent implements AfterContentInit, DoCheck {
    classAlign: string;
    classLabel: string;
    classInput: string;
    subscribeValidation: Subscription;
    
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: DateTimeEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor(public event: MvcEventService) {

    }

    ngAfterContentInit() {
        if (this.decorator) {
            this.decorator = _.cloneDeep(this.decorator);
            this.classAlign = UtilityHelper.alignString(this.decorator.align);
        }

        // icon
        if (!this.decorator.icon) this.decorator.icon = 'la la-clock-o';

        // set default value
        if (!this.decorator.value && this.decorator.default) {
            this.decorator.value = _.cloneDeep(this.decorator.default);
            this.object[this.decorator.property] = this.decorator.value;
            this.valueChange.emit(this.object[this.decorator.property]);
        }

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');
        
        // format
        let item: DateTimeEx = <DateTimeEx>this.decorator;
        item.valueDisplay = (item && item.value) || null;
        
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

        // render editor
        if (item.editable) {
            let interval = setInterval(() => {
                let $element = <any>jQuery('#' + this.decorator.id);
                if ($element && $element.length > 0) {
                    clearInterval(interval);
                    if (!this.decorator.value)
                        this.decorator.value = null;
                    if (!this.decorator.valueDisplay)
                        this.decorator.valueDisplay = null;
                    $element.timepicker({
                        autoclose: true,
                        minuteStep: 5,
                        showMeridian: false,
                        showSeconds: item.format.indexOf('ss') >= 0,
                    }).on('changeTime.timepicker', (ev: any) => {
                        this.decorator.value = ev.time.value;
                        this.object[this.decorator.property] = ev.time.value;
                        if (this.decorator.value) {
                            this.decorator.valid = true;
                            this.decorator.message = '';
                        }
                        this.valueChange.emit(this.object[this.decorator.property]);
                    });
                }
            }, 100);
        }
    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.value = value;
            this.decorator.valueDisplay = value;
            if (this.decorator.type == DateTimeType.Time) {
                if (this.object &&
                    this.decorator &&
                    this.object[this.decorator.property]) {
                    setTimeout(() => {
                        let $element = <any>jQuery('#' + this.decorator.id);
                        if ($element && $element.length > 0) {
                            $element.timepicker('update');
                        }
                    }, 500);
                }
            }
        }
    }

    clearValue() {
        this.decorator.value = null;
        this.object[this.decorator.property] = null;
        this.valueChange.emit(this.object[this.decorator.property]);
    }
}
