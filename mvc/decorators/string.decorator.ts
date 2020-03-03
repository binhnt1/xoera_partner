import { register } from "./validation";
import { AlignType } from "../domains/enums/align.type";
import { PatternType } from "../domains/enums/pattern.type";
import { ObjectEx, ObjectExHelper } from "./object.decorator";
import { StringType, DataType } from "../domains/enums/data.type";

export class StringEx extends ObjectEx {
    public min?: number;
    public max?: number;
    public rows?: number;
    public format?: string;
    public type?: StringType;
    public requiredMatch?: string;
    public variables?: StringVariable[];

    constructor(max?: number, required?: boolean, min?: number, column?: string, subfix?: string) {
        super();
        this.min = min || 0;
        this.subfix = subfix;
        this.column = column;
        this.max = max || 250;
        this.type = StringType.Text;
        this.dataType = DataType.String;
        this.required = required ? required : false;
    }
}

export function StringDecorator(options?: StringEx) {
    if (!options) options = new StringEx();
    options.dataType = DataType.String;
    if (!options.min) options.min = 0;
    if (!options.rows) options.rows = 5;
    if (!options.valid) options.valid = true;
    if (options.order == null) options.order = 1;
    if (!options.max) {
        switch (options.type) {
            case StringType.Code: options.max = 10; break;
            case StringType.Text: options.max = 255; break;
            case StringType.Phone: options.max = 15; break;
            case StringType.Email: options.max = 50; break;
            case StringType.Skype: options.max = 50; break;
            case StringType.Link: options.max = 1000; break;
            case StringType.Account: options.max = 255; break;
            case StringType.Password: options.max = 20; break;
            case StringType.PhoneText: options.max = 15; break;
            case StringType.MultiText: options.max = 2000; break;
        }
    }
    if (!options.type) options.type = StringType.Text;
    if (!options.icon) {
        switch (options.type) {
            case StringType.Code: options.icon = 'la la-code'; break;
            case StringType.Link: options.icon = 'la la-link'; break;
            case StringType.Skype: options.icon = 'la la-skype'; break;
            case StringType.Account: options.icon = 'la la-user'; break;
            case StringType.Password: options.icon = 'la la-key'; break;
            case StringType.Email: options.icon = 'la la-envelope'; break;
            case StringType.PhoneText: options.icon = 'la la-phone'; break;
        }
    }
    if (options.exists == null) options.exists = false;
    if (!options.align) options.align = AlignType.Left;
    if (options.editable == null) options.editable = true;
    if (options.readonly == null) options.readonly = false;
    if (!options.valueDisplay) options.valueDisplay = null;
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
        if (!options.validators) options.validators = [];
        switch (options.type) {
            case StringType.Card: {
                options.validators.push({
                    pattern: PatternType.CardNumber,
                    message: label + ' is invalid format'
                });
            }
                break;
            case StringType.Link: {
                options.validators.push({
                    pattern: new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', 'i'),
                    message: label + ' is invalid format'
                });
            }
                break;
            case StringType.Email: {
                options.validators.push({
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: label + ' is invalid format'
                });
            }
                break;
            case StringType.Phone: {
                options.validators.push({
                    pattern: /^[\+]*\d+$/,
                    message: label + ' is invalid format'
                });
            }
                break;
            case StringType.PhoneText: {
                options.validators.push({
                    pattern: /^[\+]*\d+$/,
                    message: label + ' is invalid format'
                });
            }
                break;
        }
        if (options.required) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.Required, message: label + ' is required' });
        }
        if (options.exists) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.Exists, table: options.table, message: label + ' does exists' });
        }
        if (options.requiredMatch) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.RequiredMatch, message: label + ' do not match ' + options.requiredMatch });
        }
        if (options.max > 0) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.Max, message: label + ' should have at max ' + options.min + ' characters' });
        }
        if (options.min > 0) {
            if (!options.validators) options.validators = [];
            options.validators.push({ pattern: PatternType.Min, message: label + ' should have at least ' + options.min + ' characters' });
        }
        register(target.constructor.name, propertyKey, options);
    }
}

export class StringVariable {
    icon?: string;
    title?: string;
    variable?: string;
    childrens?: StringVariable[];
}