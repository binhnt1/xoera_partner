import "reflect-metadata";
import * as _ from "lodash";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { StringTypeAware } from "../../../../mvc/domains/enums/data.type";
import { Component, Input, AfterContentInit, Output, EventEmitter } from "@angular/core";

@StringTypeAware
@Component({
    selector: 'editor-stringbox',
    templateUrl: './stringbox.component.html',
})
export class EditorStringBoxComponent implements AfterContentInit {
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();

    constructor() {

    }

    ngAfterContentInit() {
        this.decorator = _.cloneDeep(this.decorator);
    }

    valueChanged(value: any) {
        this.valueChange.emit(value);
    }
}
