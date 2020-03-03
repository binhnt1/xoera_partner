import "reflect-metadata";
import * as _ from "lodash";
import { Dictionary } from "../../../../mvc/domains/data/dictionary";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { EditorDropDownboxDropDownComponent } from "./dropdown/dropdown.component";
import { Component, Input, AfterContentInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { DropdownLoadTypeAware, DropDownTypeAware } from "../../../../mvc/domains/enums/data.type";
import { EditorDropDownboxDropDownDevExpressComponent } from "./dropdown.devexpress/dropdown.devexpress.component";

@DropDownTypeAware
@DropdownLoadTypeAware
@Component({
    selector: 'editor-dropdownbox',
    templateUrl: './dropdownbox.component.html',
})
export class EditorDropDownboxComponent implements AfterContentInit {
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();
    @ViewChild('dropdown', { static: false }) dropdown: EditorDropDownboxDropDownComponent;
    @ViewChild('dropdowndevexpress', { static: false }) dropdowndevexpress: EditorDropDownboxDropDownDevExpressComponent;

    constructor() {

    }

    ngAfterContentInit() {
        this.decorator = _.cloneDeep(this.decorator);
    }

    valueChanged(value: any) {
        this.valueChange.emit(value);
    }

    public refreshData(data: Dictionary[], selected: Dictionary = null) {
        let interval = setInterval(() => {
            if (this.dropdown) {
                clearInterval(interval);
                this.dropdown.refreshData(data, selected);
            }
            if (this.dropdowndevexpress) {
                clearInterval(interval);
                this.dropdown.refreshData(data, selected);
            }
        }, 100);
    }
}
