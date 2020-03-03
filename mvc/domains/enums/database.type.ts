export enum DatabaseType {
    MySql = 1,
    Sql,
}
export function DatabaseTypeAware(constructor: Function) {
    constructor.prototype.DatabaseType = DatabaseType;
}
