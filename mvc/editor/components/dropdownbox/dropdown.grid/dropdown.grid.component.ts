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
import DataSource from "devextreme/data/data_source";
import { createStore } from "devextreme-aspnet-data-nojquery";
import { AppConfig } from "../../../../helpers/app.config";

@Component({
    styleUrls: ['./dropdown.grid.scss'],
    selector: 'editor-dropdownbox-dropdown-grid',
    templateUrl: './dropdown.grid.component.html',
})
export class EditorDropDownboxDropDownGridComponent implements AfterContentInit, DoCheck {
    dataSource: any;
    classAlign: string;
    classLabel: string;
    classInput: string;
    items: Dictionary[];
    propertyKey: string;
    propertyDisplay: string;
    propertyColumns: string[];
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
        this.dataSource = new DataSource({
            store: createStore({
                loadUrl: AppConfig.ApiUrl + '/curd/FindAllByTEntity?table=Driver',
                onBeforeSend: (r, s) => {
                },
                key: 'driverId'
            })
        });
    }

    async ngAfterContentInit() {
        this.decorator = _.cloneDeep(this.decorator);
        let item: DropDownEx = <DropDownEx>this.decorator;
        this.propertyKey = item.propertyValue;
        this.propertyColumns = item.propertyDisplay;
        this.propertyDisplay = item.propertyDisplayFocus;
        if (!this.propertyDisplay)
            this.propertyDisplay = item.propertyDisplay.find(c => c.toLowerCase().indexOf('name') >= 0);
        if (!this.propertyDisplay)
            this.propertyDisplay = item.propertyDisplay[0];
        if (item.data) {
            this.items = item.data;
        } else if (item.dataSource) {
            this.items = item.dataSource;
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
        if (!this.decorator.editable) {
            let obj = this.items.find(c => c.key == this.decorator.value);
            item.valueDisplay = (obj && obj.value) || null;
        }

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
        this.classAlign = UtilityHelper.alignString(this.decorator.align);
    }

    ngDoCheck() {
        if (this.object) {
            let value = this.object[this.decorator.property];
            if (this.decorator.value != value) {
                this.decorator.value = value;
                this.valueChange.emit(this.object[this.decorator.property]);
            }
        }
    }

    rowSelected(e: any) {
        this.decorator.value = e.data[this.propertyKey];
        this.object[this.decorator.property] = this.decorator.value;
        if (this.decorator.value) {
            this.decorator.valid = true;
            this.decorator.message = '';
        }
        this.valueChange.emit(this.object[this.decorator.property]);
    }

    refreshData(data: Dictionary[], selected: Dictionary = null) {
        this.items = data;
        let $element = <any>jQuery('#' + this.decorator.id);
        if ($element && $element.length > 0) {
            (<DropDownEx>this.decorator).allowSearch = this.items && this.items.length > 10;
            UtilityHelper.executeTimeout(() => {
                this.decorator.value = selected.key;
                this.object[this.decorator.property] = selected.key;
                this.valueChange.emit(this.object[this.decorator.property]);
            });
        }
    }
}
