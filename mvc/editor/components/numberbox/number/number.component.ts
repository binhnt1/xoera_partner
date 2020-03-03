import "reflect-metadata";
import * as _ from "lodash";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { NumberEx } from "../../../../../mvc/decorators/number.decorator";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { OnInit, Input, Component, Output, EventEmitter, DoCheck } from "@angular/core";

@Component({
    styleUrls: ['./number.scss'],
    selector: 'editor-numberbox-number',
    templateUrl: './number.component.html',
})
export class EditorNumberboxNumberComponent implements OnInit, DoCheck {
    classAlign: string;
    classLabel: string;
    classInput: string;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        this.decorator = _.cloneDeep(this.decorator);

        // set default value
        if (!this.decorator.value && this.decorator.default != null) {
            let value = _.cloneDeep(this.decorator.default);
            this.decorator.value = parseFloat(value);
            this.object[this.decorator.property] = parseFloat(value);
            this.valueChange.emit(this.object[this.decorator.property]);
        }

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        let item: NumberEx = <NumberEx>this.decorator;
        item.valueDisplay = item.value;
        if (item.editable && !item.readonly) {
            let interval = setInterval(() => {
                let $element = <any>jQuery('#' + this.decorator.id);
                if ($element && $element.length > 0) {
                    clearInterval(interval);
                    $element.TouchSpin({
                        boostat: 5,
                        min: item.min,
                        max: item.max,
                        step: item.step,
                        decimals: item.decimals,
                        buttonup_class: 'btn btn-secondary',
                        buttondown_class: 'btn btn-secondary',
                    }).on('change', () => {
                        let value = $element.val()
                            .replace(',', '');
                        this.decorator.value = parseFloat(value);
                        this.object[this.decorator.property] = parseFloat(value);
                        if (this.decorator.value) {
                            this.decorator.valid = true;
                            this.decorator.message = '';
                        }
                        this.valueChange.emit(this.object[this.decorator.property]);
                    });
                }
            }, 100);
        }
        this.classAlign = UtilityHelper.alignString(this.decorator.align);
    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.valueDisplay = value;
            this.decorator.value = parseFloat(value);
            this.valueChange.emit(this.object[this.decorator.property]);
        }
    }

    public refreshMin(min: number) {
        let $element = <any>jQuery('#' + this.decorator.id);
        if ($element && $element.length > 0) {
            $element.trigger("touchspin.updatesettings", { min: min });
        }

    }

    public refreshMax(max: number) {
        let $element = <any>jQuery('#' + this.decorator.id);
        if ($element && $element.length > 0) {
            $element.trigger("touchspin.updatesettings", { max: max });
        }
    }
}
