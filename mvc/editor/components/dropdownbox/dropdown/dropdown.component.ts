import * as _ from "lodash";
import { Subscription } from "rxjs/Subscription";
import { StoreHelper } from "../../../../helpers/store.helper";
import { MvcDataService } from "../../../../services/data.service";
import { MvcEventService } from '../../../../services/event.service';
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { Dictionary } from "../../../../../mvc/domains/data/dictionary";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { DropDownEx } from "../../../../../mvc/decorators/dropdown.decorator";
import { Input, Component, EventEmitter, Output, AfterContentInit, DoCheck } from "@angular/core";

@Component({
    styleUrls: ['./dropdown.scss'],
    selector: 'editor-dropdownbox-dropdown',
    templateUrl: './dropdown.component.html',
})
export class EditorDropDownboxDropDownComponent implements AfterContentInit, DoCheck {
    classAlign: string;
    classLabel: string;
    classInput: string;
    items: Dictionary[];
    subscribeValidation: Subscription;

    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor(
        public data: MvcDataService,
        public event: MvcEventService) {
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
        let obj = this.items.find(c => c.key == this.decorator.value);
        item.valueDisplay = (obj && obj.value) || null;

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');

        // set default value
        if (!this.decorator.value) {
            if (this.decorator.default) {
                this.decorator.value = _.cloneDeep(this.decorator.default);
                this.object[this.decorator.property] = this.decorator.value;
                this.valueChange.emit(this.object[this.decorator.property]);
            } else {
                let item = this.items && this.items[0];
                if (item) {
                    this.decorator.value = _.cloneDeep(item.key);
                    this.object[this.decorator.property] = this.decorator.value;
                    this.valueChange.emit(this.object[this.decorator.property]);
                }
            }
        }

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
        if (item.editable && this.items && this.items.length > 0) {
            this.renderEditor();
        }
        this.classAlign = UtilityHelper.alignString(this.decorator.align);
    }

    ngDoCheck() {
        let $element = <any>jQuery('#' + this.decorator.id);
        if ($element && $element.length > 0 && this.object) {
            let value = this.object[this.decorator.property];
            if (this.decorator.value != value) {
                this.decorator.value = value;
                $element.selectpicker('val', value);
                this.valueChange.emit(this.object[this.decorator.property]);
            }
        }
    }

    refreshData(data: Dictionary[], selected: Dictionary = null) {
        let haveRendered = this.items && this.items.length > 0;
        this.items = data;
        let $element = <any>jQuery('#' + this.decorator.id);
        if ($element && $element.length > 0) {
            (<DropDownEx>this.decorator).allowSearch = this.items && this.items.length > 10;
            UtilityHelper.executeTimeout(() => {
                if (haveRendered)
                    $element.selectpicker('refresh');
                else
                    this.renderEditor();
                if (selected && this.object) {
                    $element.selectpicker('val', selected.key);
                    this.object[this.decorator.property] = selected.key;
                    this.valueChange.emit(this.object[this.decorator.property]);
                }
            });
        }
    }

    private renderEditor() {
        let interval = setInterval(() => {
            let $element = <any>jQuery('#' + this.decorator.id);
            if ($element && $element.length > 0) {
                clearInterval(interval);
                $element.selectpicker({
                    iconBase: 'fa',
                    tickIcon: 'fa-check',
                }).on('changed.bs.select', (e: any, clickedIndex: number) => {
                    if (clickedIndex !== undefined && clickedIndex !== null) {
                        let value = clickedIndex >= 0
                            ? this.items[clickedIndex].key
                            : null;
                        this.decorator.value = value;
                        this.object[this.decorator.property] = value;
                        if (this.decorator.value) {
                            this.decorator.valid = true;
                            this.decorator.message = '';
                        }
                        this.valueChange.emit(this.object[this.decorator.property]);
                    }
                });
                $element.selectpicker('refresh');
            }
        }, 100);
    }
}
