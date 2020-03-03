import "reflect-metadata";
import * as _ from "lodash";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { BooleanTypeAware } from "../../../../mvc/domains/enums/data.type";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@BooleanTypeAware
@Component({
    selector: 'editor-boolbox',
    templateUrl: './boolbox.component.html',
})
export class EditorBoolBoxComponent implements OnInit {
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('objectChange') objectChange = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        this.decorator = _.cloneDeep(this.decorator);
    }
}
