import { TableEx } from "../decorators/table.decorator";
import { ConstantHelper } from "../helpers/constant.helper";

export class DecoratorHelper {
    public static DecoratorClass(target: any) {
        if (typeof target == 'string') {
            let meta = ConstantHelper.REGISTRY_METADATA_CLASS.get(target);
            return meta;
        } else {
            let meta = ConstantHelper.REGISTRY_METADATA_CLASS.get(target.name);
            return meta;
        }
    }
    public static DecoratorClassByTable(name: string) {
        ConstantHelper.REGISTRY_METADATA_CLASS.forEach((table: TableEx) => {
            if (table.name == name) return table;
        });
    }
    public static DecoratorProperties(target: any): any[] {
        let result: any[] = [],
            targetString = typeof target == 'string'
                ? target
                : target.TableEx
                    ? target.TableEx.className
                    : target.constructor.name,
            metaBase = ConstantHelper.REGISTRY_METADATA.get('BaseEntity'),
            metaObject = ConstantHelper.REGISTRY_METADATA.get(targetString),
            metaBaseEx = ConstantHelper.REGISTRY_METADATA.get('BaseExEntity');
        if (metaBase) {
            for (let value of metaBase.values()) {
                result.push(value);
            }
        }
        if (metaBaseEx) {
            for (let value of metaBaseEx.values()) {
                result.push(value);
            }
        }
        if (metaObject) {
            for (let value of metaObject.values()) {
                result.push(value);
            }
        }
        return result;
    }
    public static DecoratorProperty(target: any, property?: string): any {
        let meta = ConstantHelper.REGISTRY_METADATA.get(target),
            metaBase = ConstantHelper.REGISTRY_METADATA.get('BaseEntity'),
            metaBaseEx = ConstantHelper.REGISTRY_METADATA.get('BaseExEntity');
        return (meta && meta.get(property)) ||
            (metaBase && metaBase.get(property)) ||
            (metaBaseEx && metaBaseEx.get(property));
    }
}