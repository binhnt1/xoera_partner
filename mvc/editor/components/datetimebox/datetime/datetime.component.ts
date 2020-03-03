import 'reflect-metadata';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { MvcEventService } from '../../../../services/event.service';
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { ObjectEx } from '../../../../../mvc/decorators/object.decorator';
import { DateTimeType } from '../../../../../mvc/domains/enums/data.type';
import { DateTimeEx } from '../../../../../mvc/decorators/datetime.decorator';
import { Component, Input, AfterContentInit, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
    styleUrls: ['./datetime.scss'],
    selector: 'editor-datetimebox-datetime',
    templateUrl: './datetime.component.html',
})
export class EditorDateTimeBoxDateTimeComponent implements AfterContentInit, DoCheck {
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
        if (!this.decorator.icon) this.decorator.icon = 'la la-calendar';

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
        if (item && item.value) {
            let format = item.format.toUpperCase()
                .replace('II', 'mm')
                .replace('SS', 'ss');
            item.valueDisplay = moment(item.value).format(format);
        } else item.valueDisplay = '';

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
        if (item.editable && !item.readonly) {
            let interval = setInterval(() => {
                let $element = <any>jQuery('#' + this.decorator.id);
                if ($element && $element.length > 0) {
                    clearInterval(interval);
                    if (!this.decorator.value)
                        this.decorator.value = null;
                    if (!this.decorator.valueDisplay)
                        this.decorator.valueDisplay = null;
                    $element.datetimepicker({
                        todayBtn: true,
                        autoclose: true,
                        format: item.format,
                        todayHighlight: true,
                        pickerPosition: 'bottom-left',
                        startDate: this.decorator.min || new Date(),
                        initialDate: item.value ? <Date>item.value : null,
                    }).on('changeDate', (ev: any) => {
                        this.decorator.value = ev.date;
                        this.object[this.decorator.property] = ev.date;
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
        let format = this.decorator.format.toUpperCase();
        if (this.decorator.value != value) {
            this.decorator.value = <Date>value;
            this.decorator.valueDisplay = moment(this.decorator.value).format(format);
            if (this.decorator.type == DateTimeType.DateTime) {
                if (this.object &&
                    this.decorator &&
                    this.object[this.decorator.property]) {
                    setTimeout(() => {
                        let $element = <any>jQuery('#' + this.decorator.id);
                        if ($element && $element.length > 0) {
                            $element.datetimepicker('update');
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
