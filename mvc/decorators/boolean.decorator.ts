import { register } from "./validation";
import { AlignType } from "../domains/enums/align.type";
import { PatternType } from "../domains/enums/pattern.type";
import { ObjectEx, ObjectExHelper } from "./object.decorator";
import { BooleanType, DataType } from "../domains/enums/data.type";

export class BooleanEx extends ObjectEx {
    public enumType?: any;
    public items?: string[];
    public type?: BooleanType;
    public description?: string;

    constructor(required?: boolean, items?: string[], column?: string, subfix?: string) {
        super();
        this.subfix = subfix;
        this.column = column;
        this.items = items || [];
        this.type = BooleanType.Checkbox;
        this.dataType = DataType.Boolean;
        this.required = required ? required : false;
    }
}

export function BooleanDecorator(options?: BooleanEx) {
    if (!options) options = new BooleanEx();
    options.dataType = DataType.Boolean;
    if (!options.valid) options.valid = true;
    if (options.order == null) options.order = 1;
    if (options.exists == null) options.exists = false;
    if (!options.align) options.align = AlignType.Center;
    if (options.editable == null) options.editable = true;
    if (!options.type) options.type = BooleanType.Checkbox;
    if (!options.valueDisplay) options.valueDisplay = null;
    if (options.readonly == null) options.readonly = false;
    if (options.allowSort == null) options.allowSort = true;
    if (options.showInGrid == null) options.showInGrid = true;
    if (options.showInEdit == null) options.showInEdit = true;
    if (options.allowFilter == null) options.allowFilter = true;
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