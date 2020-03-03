import "reflect-metadata";
import * as _ from "lodash";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { Component, Input, AfterContentInit, Output, EventEmitter } from "@angular/core";
import { DateTimeTypeAware } from "../../../../mvc/domains/enums/data.type";

@DateTimeTypeAware
@Component({
    selector: 'editor-datetimebox',
    templateUrl: './datetimebox.component.html',
})
export class EditorDateTimeBoxComponent implements AfterContentInit {
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor() {

    }

    valueChanged(value: any) {
        this.valueChange.emit(value);
    }

    ngAfterContentInit() {
        this.decorator = _.cloneDeep(this.decorator);
    }
}
