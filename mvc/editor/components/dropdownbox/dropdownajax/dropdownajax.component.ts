import * as _ from "lodash";
import { MvcApiService } from '../../../../services/api.service';
import { MvcDataService } from "../../../../services/data.service";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { Dictionary } from "../../../../../mvc/domains/data/dictionary";
import { ObjectEx } from "../../../../../mvc/decorators/object.decorator";
import { Input, Component, EventEmitter, Output, OnInit } from "@angular/core";

@Component({
    styleUrls: ['./dropdownajax.scss'],
    selector: 'editor-dropdownbox-dropdownajax',
    templateUrl: './dropdownajax.component.html',
})
export class EditorDropDownboxDropDownAjaxComponent implements OnInit {
    classAlign: string;
    classLabel: string;
    classInput: string;
    items: Dictionary[];
    @Input() object: any;
    @Input() property: string;
    @Input() disabled: boolean;
    @Input() decorator: ObjectEx;
    @Output('objectChange') objectChange = new EventEmitter();

    constructor(
        public data: MvcDataService,
        public service: MvcApiService) {
    }

    ngOnInit() {
        this.decorator = _.cloneDeep(this.decorator);
        this.classAlign = UtilityHelper.alignString(this.decorator.align);

        // grid
        if (!this.decorator.grid) this.decorator.grid = '3-6';
        let classLabel = 'col-sm-' + this.decorator.grid.split('-')[0],
            classInput = 'col-sm-' + this.decorator.grid.split('-')[1];
        this.classLabel = classLabel + (this.decorator.classLabel ? ' ' + this.decorator.classLabel : '');
        this.classInput = classInput + (this.decorator.classInput ? ' ' + this.decorator.classInput : '');
    }

    valueChange(value: any) {
        this.decorator.value = value;
        this.object[this.decorator.property] = value;
    }
}
