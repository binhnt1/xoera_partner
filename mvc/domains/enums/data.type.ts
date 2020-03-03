export enum DataType {
    String = 1,
    File,
    Number,
    Boolean,
    DateTime,
    DropDown,
}
export function DataTypeAware(constructor: Function) {
    constructor.prototype.DataType = DataType;
}

export enum DateTimeType {
    Date = 1,
    Time,
    DateTime
}
export function DateTimeTypeAware(constructor: Function) {
    constructor.prototype.DateTimeType = DateTimeType;
}

export enum StringType {
    Cvc = 1,
    Text,
    Code,
    Link,
    Card,
    Phone,
    Email,
    Skype,
    Account,
    Password,
    MultiText,
    MultiHtml,
    PhoneText,
    AutoGenerate
}
export function StringTypeAware(constructor: Function) {
    constructor.prototype.StringType = StringType;
}

export enum NumberType {
    Text = 1,
    Range,
    Numberic
}
export function NumberTypeAware(constructor: Function) {
    constructor.prototype.NumberType = NumberType;
}

export enum FileType {
    File = 1,
    Image
}
export function FileTypeAware(constructor: Function) {
    constructor.prototype.FileType = FileType;
}

export enum StoreFileType {
    Local = 1,
    Cloud,
    Database
}
export function StoreFileTypeAware(constructor: Function) {
    constructor.prototype.StoreFileType = StoreFileType;
}

export enum BooleanType {
    RadioButton = 1,
    Checkbox
}
export function BooleanTypeAware(constructor: Function) {
    constructor.prototype.BooleanType = BooleanType;
}

export enum DropDownType {
    List = 1,
    Dropdown,
    DropdownGrid,
    DropdownDevexpress
}
export function DropDownTypeAware(constructor: Function) {
    constructor.prototype.DropDownType = DropDownType;
}

export enum DropdownLoadType {
    All = 1,
    Ajax
}
export function DropdownLoadTypeAware(constructor: Function) {
    constructor.prototype.DropdownLoadType = DropdownLoadType;
}

export enum DropdownLayoutType {
    Rows = 1,
    Columns
}
export function DropdownLayoutTypeAware(constructor: Function) {
    constructor.prototype.DropdownLayoutType = DropdownLayoutType;
}
