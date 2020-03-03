import "reflect-metadata";
import * as _ from "lodash";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { NumberType } from "../../../../../mvc/domains/enums/data.type";
import { NumberEx } from "../../../../../mvc/decorators/number.decorator";
import { OnInit, Input, Component, Output, EventEmitter, DoCheck } from "@angular/core";

@Component({
    styleUrls: ['./text.scss'],
    selector: 'editor-numberbox-text',
    templateUrl: './text.component.html',
})
export class EditorNumberboxTextComponent implements OnInit, DoCheck {
    classAlign: string;
    classLabel: string;
    classInput: string;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: NumberEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        this.decorator = _.cloneDeep(this.decorator);

        // align
        this.classAlign = UtilityHelper.alignString(this.decorator.align);

        // set default value
        if (!this.decorator.value && this.decorator.default != null) {
            let value = _.cloneDeep(this.decorator.default);
            this.decorator.value = parseFloat(value);
            this.object[this.decorator.property] = parseFloat(value);
            this.valueChange.emit(this.object[this.decorator.property]);
        }
        this.decorator.valueDisplay = this.decorator.value;      

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.valueDisplay = value;
            this.decorator.value = parseFloat(value);
            this.valueChange.emit(this.object[this.decorator.property]);
        }
    }

    onKeyup() {
        if (this.decorator.type == NumberType.Text) {
            if (!this.decorator.value) return;
            if (this.decorator.value.length == 0) return;

            if (/\D/g.test(this.decorator.value))
                this.decorator.value = this.decorator.value.replace(/\D/g, '');
        }
    }
}
