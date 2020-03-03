import "reflect-metadata";
import * as _ from "lodash";
import { Router } from "@angular/router";
import { Dictionary } from "../domains/data/dictionary";
import { ObjectEx } from "../decorators/object.decorator";
import { NumberEx } from "../decorators/number.decorator";
import { StringEx } from "../decorators/string.decorator";
import { BooleanEx } from "../decorators/boolean.decorator";
import { DropDownEx } from "../decorators/dropdown.decorator";
import { DateTimeEx } from "../decorators/datetime.decorator";
import { UtilityHelper } from "../../mvc/helpers/utility.helper";
import { MvcDataService } from "../../mvc/services/data.service";
import { EditorNumberboxComponent } from "./components/numberbox/numberbox.component";
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { EditorDropDownboxComponent } from "./components/dropdownbox/dropdownbox.component";
import { DataTypeAware, DataType, DropdownLoadType, NumberType, StringType, DateTimeType, DropDownType, DropdownLayoutType } from "../domains/enums/data.type";

@DataTypeAware
@Component({
    selector: 'editor',
    styleUrls: ['./editor.scss'],
    templateUrl: './editor.component.html',
})
export class EditorComponent implements OnInit {
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();
    @ViewChild('numberbox', { static: false }) numberbox: EditorNumberboxComponent;
    @ViewChild('dropdownbox', { static: false }) dropdownbox: EditorDropDownboxComponent;

    constructor(
        public router: Router,
        public data: MvcDataService) {
    }

    async ngOnInit() {
        let decorator: ObjectEx;
        this.decorator = _.cloneDeep(this.decorator);
        if (this.property) {
            if (this.property == 'value')
                console.log('FilterData.value');
            if (this.property.indexOf('.') >= 0) {
                let className = this.property.split('.')[0],
                    propertyName = this.property.split('.')[1],
                    tempDecorator = await this.data.decorator(className, propertyName);
                decorator = _.cloneDeep(tempDecorator || new ObjectEx());
            } else {
                let propertyName = this.property,
                    className = this.object.constructor.name,
                    tempDecorator = await this.data.decorator(className, propertyName);
                decorator = _.cloneDeep(tempDecorator || new ObjectEx());
            }
            if (this.decorator) {
                if (this.decorator.icon) decorator.icon = this.decorator.icon;
                if (this.decorator.grid) decorator.grid = this.decorator.grid;
                if (this.decorator.value) decorator.value = this.decorator.value;
                if (this.decorator.align) decorator.align = this.decorator.align;
                if (this.decorator.label != null) decorator.label = this.decorator.label;
                if (this.decorator.dataType) decorator.dataType = this.decorator.dataType;
                if (this.decorator.readonly) decorator.readonly = this.decorator.readonly;
                if (this.decorator.classLabel) decorator.classLabel = this.decorator.classLabel;
                if (this.decorator.classInput) decorator.classInput = this.decorator.classInput;
                if (this.decorator.editable != null) decorator.editable = this.decorator.editable;
                if (this.decorator.placeholder) decorator.placeholder = this.decorator.placeholder;
                if (this.decorator.valueDisplay) decorator.valueDisplay = this.decorator.valueDisplay;
                if (this.decorator.id) decorator.id = this.decorator.id;
                else if (decorator.property)
                    decorator.id = decorator.property.toLowerCase() + '_' + UtilityHelper.randomText(8);
                switch (decorator.dataType) {
                    case DataType.DropDown: {
                        let temp = <DropDownEx>this.decorator;

                        // Set default value
                        if (!(<DropDownEx>decorator).type) (<DropDownEx>decorator).type = DropDownType.Dropdown;
                        if (!(<DropDownEx>decorator).loadType) (<DropDownEx>decorator).loadType = DropdownLoadType.All;
                        if (!(<DropDownEx>decorator).layoutType) (<DropDownEx>decorator).layoutType = DropdownLayoutType.Rows;

                        // Set other value
                        if (temp.data) (<DropDownEx>decorator).data = temp.data;
                        if (temp.items) (<DropDownEx>decorator).items = temp.items;
                        if (temp.enumType) (<DropDownEx>decorator).enumType = temp.enumType;
                        if (temp.multiple) (<DropDownEx>decorator).multiple = temp.multiple;
                        if (temp.reference) (<DropDownEx>decorator).reference = temp.reference;
                        if (temp.emptyItem) (<DropDownEx>decorator).emptyItem = temp.emptyItem;
                        if (temp.type) (<DropDownEx>decorator).type = temp.type || DropDownType.Dropdown;
                        if (temp.propertyValue) (<DropDownEx>decorator).propertyValue = temp.propertyValue || 'Id';
                        if (temp.loadType) (<DropDownEx>decorator).loadType = temp.loadType || DropdownLoadType.All;
                        if (temp.layoutType) (<DropDownEx>decorator).layoutType = temp.layoutType || DropdownLayoutType.Rows;
                        if (temp.propertyDisplay) (<DropDownEx>decorator).propertyDisplay = temp.propertyDisplay || ['Name'];
                    }
                        break;
                    case DataType.Number: {
                        let temp = <NumberEx>this.decorator;

                        // Set default value
                        if (!(<NumberEx>decorator).type) (<NumberEx>decorator).type = NumberType.Numberic;

                        // Set other value
                        if (temp.min) (<NumberEx>decorator).min = temp.min || 0;
                        if (temp.step) (<NumberEx>decorator).step = temp.step || 1;
                        if (temp.max) (<NumberEx>decorator).max = temp.max || 10000;
                        if (temp.unit) (<NumberEx>decorator).unit = temp.unit || '';
                        if (temp.decimals) (<NumberEx>decorator).decimals = temp.decimals;
                        if (temp.type) (<NumberEx>decorator).type = temp.type || NumberType.Numberic;
                    }
                        break;
                    case DataType.String: {
                        let temp = <StringEx>this.decorator;
                        // Set default value
                        if (!(<StringEx>decorator).type) (<StringEx>decorator).type = StringType.Text;

                        // Set other value
                        if (temp.min) (<StringEx>decorator).min = temp.min || 0;
                        if (temp.min) (<StringEx>decorator).max = temp.max || 250;
                        if (temp.rows) (<StringEx>decorator).rows = temp.rows || 3;
                        if (temp.type) (<StringEx>decorator).type = temp.type || StringType.Text;
                    }
                        break;
                    case DataType.Boolean: {
                        let temp = <BooleanEx>this.decorator;
                        if (temp.description) (<BooleanEx>decorator).description = temp.description || '';
                    }
                        break;
                    case DataType.DateTime: {
                        let temp = <DateTimeEx>this.decorator;
                        let now = new Date(),
                            day = now.getDate(),
                            month = now.getMonth() + 1,
                            year = now.getFullYear() + 100,
                            maxDate = new Date(year, month, day);
                        // Set default value
                        if (!(<DateTimeEx>decorator).type) (<DateTimeEx>decorator).type = DateTimeType.Date;

                        // Set other value
                        if (temp.type) (<DateTimeEx>decorator).format = temp.format;
                        if (temp.max) (<DateTimeEx>decorator).max = temp.max || maxDate;
                        if (temp.format) (<DateTimeEx>decorator).type = temp.type || DateTimeType.Date;
                        if (temp.min) (<DateTimeEx>decorator).min = temp.min || new Date(1900, 1, 1, 0, 0, 0, 0);
                    }
                        break;
                }
            }
        }
        if (decorator || this.decorator) {
            this.decorator = _.cloneDeep(decorator || this.decorator);
            if (this.decorator.id) decorator.id = this.decorator.id;
            else if (this.decorator.property)
                this.decorator.id = this.decorator.property.toLowerCase() + '_' + UtilityHelper.randomText(8);
            if (!this.decorator.value && this.object[this.decorator.property])
                this.decorator.value = this.object[this.decorator.property];
            if (!this.decorator.valueDisplay && this.object[this.decorator.property])
                this.decorator.valueDisplay = _.cloneDeep(this.decorator.value);
            if (this.decorator.value == undefined) this.decorator.value = null;
        }
    }

    public valueChanged(value: any) {
        this.valueChange.emit(value);
    }

    public refreshMinOfNumber(min: number) {
        let interval = setInterval(() => {
            if (this.numberbox) {
                clearInterval(interval);
                this.numberbox.refreshMin(min);
            }
        }, 100);
    }

    public refreshMaxOfNumber(max: number) {
        let interval = setInterval(() => {
            if (this.numberbox) {
                clearInterval(interval);
                this.numberbox.refreshMax(max);
            }
        }, 100);
    }

    public refreshDataOfDropDown(data: Dictionary[], selected: Dictionary = null) {
        if (this.decorator.dataType == DataType.DropDown) {
            let interval = setInterval(() => {
                if (this.dropdownbox) {
                    clearInterval(interval);
                    this.dropdownbox.refreshData(data, selected);
                }
            }, 100);
        }
    }
}
