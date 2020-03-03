import { register } from "./validation";
import { AlignType } from "../domains/enums/align.type";
import { PatternType } from "../domains/enums/pattern.type";
import { ObjectEx, ObjectExHelper } from "./object.decorator";
import { NumberType, DataType } from "../domains/enums/data.type";

export class NumberEx extends ObjectEx {
    public min?: number;
    public max?: number;
    public step?: number;
    public unit?: string;
    public type?: NumberType;
    public decimals?: number;

    constructor(max?: number, step?: number, required?: boolean, min?: number, column?: string, subfix?: string) {
        super();
        this.min = min || 0;
        this.subfix = subfix;
        this.column = column;
        this.step = step || 1;
        this.max = max || 1000000;
        this.type = NumberType.Numberic;
        this.dataType = DataType.Number;
        this.required = required ? required : false;
    }
}

export function NumberDecorator(options?: NumberEx) {
    if (!options) options = new NumberEx();
    options.dataType = DataType.Number;
    if (!options.min) options.min = 0;
    if (!options.step) options.step = 1;
    if (!options.max) options.max = 1000000;
    if (!options.valid) options.valid = true;
    if (!options.decimals) options.decimals = 0;
    if (options.order == null) options.order = 1;
    if (options.exists == null) options.exists = false;
    if (!options.align) options.align = AlignType.Right;
    if (options.editable == null) options.editable = true;
    if (!options.type) options.type = NumberType.Numberic;
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