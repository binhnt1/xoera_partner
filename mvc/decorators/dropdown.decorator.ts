import { register } from "./validation";
import { AlignType } from "../domains/enums/align.type";
import { Dictionary } from "../domains/data/dictionary";
import { PatternType } from "../domains/enums/pattern.type";
import { ObjectEx, ObjectExHelper } from "./object.decorator";
import { DataType, DropdownLoadType, DropDownType, DropdownLayoutType } from "../domains/enums/data.type";

export class DropDownEx extends ObjectEx {
    public enumType?: any;
    public items?: string[];
    public dataSource?: any;
    public multiple?: boolean;
    public type?: DropDownType;
    public data?: Dictionary[];
    public dropDownOptions?: any;
    public emptyItem?: Dictionary;
    public propertyValue?: string;
    public reference?: new () => {};
    public propertyDisplay?: string[];
    public loadType?: DropdownLoadType;
    public propertyDisplayFocus?: string;
    public layoutType?: DropdownLayoutType;
    
    constructor(required?: boolean, column?: string, subfix?: string) {
        super();
        this.subfix = subfix;
        this.column = column;
        this.multiple = false;
        this.propertyValue = 'Id';
        this.propertyDisplay = ['Name'];
        this.dataType = DataType.DropDown;
        this.loadType = DropdownLoadType.All;
        this.required = required ? required : false;
        this.emptyItem = new Dictionary('0', 'Select');
    }
}

export function DropDownDecorator(options?: DropDownEx) {
    if (!options) options = new DropDownEx();
    options.dataType = DataType.DropDown;
    if (!options.valid) options.valid = true;
    if (options.order == null) options.order = 1;
    if (options.exists == null) options.exists = false;
    if (!options.align) options.align = AlignType.Left;
    if (options.editable == null) options.editable = true;
    if (options.multiple == null) options.multiple = false;
    if (!options.valueDisplay) options.valueDisplay = null;
    if (options.readonly == null) options.readonly = false;
    if (!options.type) options.type = DropDownType.Dropdown;
    if (options.allowSort == null) options.allowSort = true;
    if (!options.propertyValue) options.propertyValue = 'Id';
    if (options.showInGrid == null) options.showInGrid = true;
    if (options.showInEdit == null) options.showInEdit = true;
    if (options.allowFilter == null) options.allowFilter = true;
    if (!options.loadType) options.loadType = DropdownLoadType.All;
    if (!options.propertyDisplay) options.propertyDisplay = ['Name'];
    if (!options.layoutType) options.layoutType = DropdownLayoutType.Rows;
    return function (target: Object, propertyKey: string) {
        let label = ObjectExHelper.CreateLabel(propertyKey);
        options.property = propertyKey;
        options.table = target.toString.name;
        options.label = options.label || label;
        options.placeholder = options.placeholder || label;
        if (options.required) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.Required, message: label + ' is required' });
        }
        if (options.exists) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.Exists, table: options.table, message: label + ' does exists' });
        }
        register(target.constructor.name, propertyKey, options);
    }
}