import { register } from "./validation";
import { DataType } from "../domains/enums/data.type";
import { AlignType } from "../domains/enums/align.type";
import { FilterData } from "../domains/data/filter.data";
import { SortingData } from "../domains/data/sorting.data";
import { PatternType } from "../domains/enums/pattern.type";

export class ObjectEx {
    public id?: string;
    public value?: any;
    public default?: any;
    public grid?: string;
    public icon?: string;
    public table?: string;
    public label?: string;
    public order?: number;
    public column?: string;
    public subfix?: string;
    public valid?: boolean;
    public message?: string;
    public exists?: boolean;
    public align?: AlignType;
    public property?: string;
    public required?: boolean;
    public editable?: boolean;
    public readonly?: boolean;
    public classLabel?: string;
    public classInput?: string;
    public allowSort?: boolean;
    public dataType?: DataType;
    public primaryKey?: boolean;
    public placeholder?: string;
    public showInGrid?: boolean;
    public showInEdit?: boolean;
    public allowFilter?: boolean;
    public allowSearch?: boolean;
    public valueDisplay?: string;
    public OnChanged?: () => void;
    public renderHtmlRaw?: string;
    public orderData?: SortingData;
    public filterData?: FilterData;
    public validators?: Validator[];
}

export function ObjectDecorator(options?: ObjectEx) {
    if (!options) options = new ObjectEx();
    options.dataType = DataType.String;
    if (!options.valid) options.valid = true;
    if (options.order == null) options.order = 1;
    if (!options.align) options.align = AlignType.Left;
    if (options.exists == null) options.exists = false;
    if (options.editable == null) options.editable = true;
    if (options.readonly == null) options.readonly = false;
    if (!options.valueDisplay) options.valueDisplay = null;
    if (options.allowSort == null) options.allowSort = true;
    if (options.showInGrid == null) options.showInGrid = true;
    if (options.showInEdit == null) options.showInEdit = true;
    if (options.allowFilter == null) options.allowFilter = true;
    if (!options.showInGrid) {
        options.allowSort = false;
        options.allowFilter = false;
        options.allowSearch = false;
    }
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

export class ObjectExHelper {
    public static CreateLabel(property: string): string {
        if (property == property.toUpperCase()) return property;
        let result: string = '',
            label = property.substr(0, 1).toUpperCase() + property.substr(1);
        for (let i = 0; i < label.length; i++) {
            let character = label[i],
                characterNext = i < label.length - 1 ? label[i + 1] : '';
            if (i == 0) result += character;
            else if (character == character.toUpperCase()) {
                if (!characterNext) result += character;
                else if (characterNext == characterNext.toUpperCase()) {
                    result += character;
                } else result += ' ' + character;
            } else {
                if (!characterNext) result += character;
                else if (characterNext == characterNext.toUpperCase()) {
                    result += character + ' ';
                } else result += character;
            }
        }
        result = result.replace('_', '');
        return result;
    }
}

export class Validator {
    pattern: any;
    table?: string;
    message?: string;
}
