import { register } from "./validation";
import { AlignType } from "../domains/enums/align.type";
import { PatternType } from "../domains/enums/pattern.type";
import { ObjectEx, ObjectExHelper } from "./object.decorator";
import { DateTimeType, DataType } from "../domains/enums/data.type";

export enum DateTimeFormat {
    HM = 'hh:ii',
    HMS = 'hh:ii:ss',
    DMY = 'dd/mm/yyyy',
    MDY = 'mm/dd/yyyy',
    YMD = 'yyyy/mm/dd',
    DMYHM = 'dd/mm/yyyy hh:ii',
    MDYHM = 'mm/dd/yyyy hh:ii',
    DMYHMS = 'dd/mm/yyyy hh:ii:ss',
    MDYHMS = 'mm/dd/yyyy hh:ii:ss',
}

export class DateTimeEx extends ObjectEx {
    public min?: Date;
    public max?: Date;
    public format?: string;
    public type?: DateTimeType;

    constructor(max?: Date, required?: boolean, min?: Date, column?: string, subfix?: string) {
        super();
        this.min = min || new Date(1900, 1, 1, 0, 0, 0, 0);
        this.subfix = subfix;
        this.column = column;
        let now = new Date(),
            day = now.getDate(),
            month = now.getMonth() + 1,
            year = now.getFullYear() + 100;
        this.max = max || new Date(year, month, day);
        this.type = DateTimeType.Date;
        this.dataType = DataType.DateTime;
        this.required = required ? required : false;
    }
}

export function DateTimeDecorator(options?: DateTimeEx) {
    if (!options) options = new DateTimeEx();
    options.dataType = DataType.DateTime;
    if (!options.valid) options.valid = true;
    if (options.order == null) options.order = 1;
    if (options.exists == null) options.exists = false;
    if (!options.align) options.align = AlignType.Center;
    if (options.editable == null) options.editable = true;
    if (!options.valueDisplay) options.valueDisplay = null;
    if (options.readonly == null) options.readonly = false;
    if (!options.type) options.type = DateTimeType.DateTime;
    if (!options.format) {
        switch (options.type) {
            case DateTimeType.Time: options.format = DateTimeFormat.HM; break;
            case DateTimeType.Date: options.format = DateTimeFormat.DMY; break;
            case DateTimeType.DateTime: options.format = DateTimeFormat.DMYHMS; break;
        }
    }
    if (!options.min) options.min = new Date(1900, 1, 1, 0, 0, 0, 0);
    if (!options.max) {
        let now = new Date(),
            day = now.getDate(),
            month = now.getMonth() + 1,
            year = now.getFullYear() + 100;
        options.max = new Date(year, month, day);
    }
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