import * as _ from "lodash";
import { MvcApiService } from "../../../../services/api.service";
import { MvcDataService } from "../../../../services/data.service";
import { StoreHelper } from "../../../../../mvc/helpers/store.helper";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { Dictionary } from "../../../../../mvc/domains/data/dictionary";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { Input, Component, EventEmitter, Output, AfterContentInit, DoCheck } from "@angular/core";
import { DropDownEx } from "../../../../../mvc/decorators/dropdown.decorator";

@Component({
    styleUrls: ['./select.scss'],
    selector: 'editor-dropdownbox-select',
    templateUrl: './select.component.html',
})
export class EditorDropDownboxSelectComponent implements AfterContentInit, DoCheck {
    classAlign: string;
    classLabel: string;
    classInput: string;
    items: Dictionary[];

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor(
        public data: MvcDataService,
        public service: MvcApiService) {
    }

    async ngAfterContentInit() {
        this.decorator = _.cloneDeep(this.decorator);
        let item: DropDownEx = <DropDownEx>this.decorator;
        if (item.data) {
            this.items = item.data;
        } else {
            let referenceKey = UtilityHelper.referenceKey(item),
                references = StoreHelper.DataReferences.get(referenceKey);
            if (!references || references.length == 0) {
                await this.data.addReferenceOfDropDown(item);
                references = StoreHelper.DataReferences.get(referenceKey);
            }
            this.items = references || [];
        }
        if (item.allowSearch == null) {
            item.allowSearch = this.items && this.items.length > 10;
        }
        this.classAlign = UtilityHelper.alignString(this.decorator.align);

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        // set value        
        this.initValue();
    }

    ngDoCheck() {
        let value = this.object[this.decorator.property];
        if (this.decorator.value != value) {
            this.decorator.value = value;
            this.initValue();
            this.valueChange.emit(this.object[this.decorator.property]);
        }
    }

    private initValue() {
        let item: DropDownEx = <DropDownEx>this.decorator;
        if (item.multiple) {
            this.items.forEach(item => {
                item.selected = false;
            });
            let array = Array.isArray(this.decorator.value)
                ? <any[]>this.decorator.value
                : this.decorator.value && <any[]>JSON.parse(this.decorator.value);
            if (array && Array.isArray(array)) {
                array.forEach(arrayItem => {
                    let obj = this.items.find(c => c.key == arrayItem);
                    if (obj) {
                        obj.selected = true;
                        let valueDisplay = (obj && obj.value) || null;
                        if (valueDisplay)
                            this.decorator.valueDisplay += this.decorator.valueDisplay ? ', ' + valueDisplay : valueDisplay;
                    }
                });
            } else {
                let obj = this.items.find(c => c.key == this.decorator.value);
                if (obj) {
                    obj.selected = true;
                    this.decorator.valueDisplay = (obj && obj.value) || null;
                }
            }
        } else {
            this.items.forEach(item => {
                item.selected = false;
            });
            let obj = this.items.find(c => c.key == this.decorator.value);
            if (obj) {
                obj.selected = true;
            }
            this.decorator.valueDisplay = (obj && obj.value) || null;
        }
    }

    public valueChanged(choice: Dictionary) {
        let item: DropDownEx = <DropDownEx>this.decorator;
        if (item.multiple) {
            let items = [];
            this.items.forEach((item: Dictionary) => {
                if (item.selected) {
                    items.push(item.key);
                }
            });
            this.decorator.value = JSON.stringify(items);
        } else {
            this.decorator.value = choice.key;
        }
        this.object[this.decorator.property] = this.decorator.value;
        if (this.decorator.value) {
            this.decorator.valid = true;
            this.decorator.message = '';
        }
        this.valueChange.emit(this.object[this.decorator.property]);
    }
}
