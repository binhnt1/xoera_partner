import "reflect-metadata";
import * as _ from "lodash";
import { ObjectEx } from "../../../../mvc/decorators/object.decorator";
import { EditorNumberboxNumberComponent } from "./number/number.component";
import { NumberTypeAware } from "../../../../mvc/domains/enums/data.type";
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";

@NumberTypeAware
@Component({
    selector: 'editor-numberbox',
    templateUrl: './numberbox.component.html',
})
export class EditorNumberboxComponent implements OnInit {
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('objectChange') objectChange = new EventEmitter();
    @ViewChild('number', { static: false }) number: EditorNumberboxNumberComponent;

    constructor() {

    }

    ngOnInit() {
        this.decorator = _.cloneDeep(this.decorator);
    }

    valueChanged(value: any) {
        this.valueChange.emit(value);
    }

    public refreshMin(min: number) {
        this.number.refreshMin(min);

    }

    public refreshMax(max: number) {
        this.number.refreshMax(max);
        
    }
}
