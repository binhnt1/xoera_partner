import { ConstantHelper } from "../helpers/constant.helper";

export class TableEx {
    name: string;
    router?: string;
    className?: string;
}

export function TableDecorator(table: TableEx) {
    return function (constructor: Function) {
        if (!table.className)
            table.className = constructor.name;
        if (!table.router)
            table.router = table.name.toLowerCase();
        if (!ConstantHelper.REGISTRY_METADATA_CLASS.has(table.className)) {
            ConstantHelper.REGISTRY_METADATA_CLASS.set(table.className, table);
        }
    }
}