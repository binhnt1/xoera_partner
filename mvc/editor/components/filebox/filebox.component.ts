import "reflect-metadata";
import * as _ from "lodash";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { FileTypeAware } from "../../../../mvc/domains/enums/data.type";
import { Component, Input, Output, EventEmitter, AfterContentInit } from "@angular/core";

@FileTypeAware
@Component({
    selector: 'editor-filebox',
    templateUrl: './filebox.component.html',
})
export class EditorFileBoxComponent implements AfterContentInit {
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
