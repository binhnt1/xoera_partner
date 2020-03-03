import { register } from "./validation";
import { AlignType } from "../domains/enums/align.type";
import { PatternType } from "../domains/enums/pattern.type";
import { ObjectEx, ObjectExHelper } from "./object.decorator";
import { FileType, StoreFileType, DataType } from "../domains/enums/data.type";

export class FileEx extends ObjectEx {
    public min?: number;
    public max?: number;
    public type?: FileType;
    public multiple?: boolean;
    public store?: StoreFileType;

    constructor(type?: FileType, max?: number, required?: boolean, multiple?: boolean, min?: number, column?: string, subfix?: string) {
        super();
        this.min = min || 0;
        this.subfix = subfix;
        this.column = column;
        this.max = max || 10;
        this.dataType = DataType.File;
        this.store = StoreFileType.Local;
        this.multiple = multiple || false;
        this.type = type || FileType.Image;
        this.required = required ? required : false;
    }
}

export function FileDecorator(options?: FileEx) {
    if (!options) options = new FileEx();
    options.dataType = DataType.File;
    if (!options.max) options.max = 10;
    if (!options.valid) options.valid = true;
    if (options.order == null) options.order = 1;
    if (!options.type) options.type = FileType.Image;
    if (!options.align) {
        options.align = options.type == FileType.Image
            ? AlignType.Center
            : AlignType.Left;
    }
    if (options.exists == null) options.exists = false;
    if (options.editable == null) options.editable = true;
    if (!options.valueDisplay) options.valueDisplay = null;
    if (options.readonly == null) options.readonly = false;
    if (!options.store) options.store = StoreFileType.Local;
    if (options.allowSort == null) options.allowSort = true;
    if (options.showInGrid == null) options.showInGrid = true;
    if (options.showInEdit == null) options.showInEdit = true;
    if (options.allowFilter == null) options.allowFilter = true;
    if (options.store == StoreFileType.Database) options.multiple = false;
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