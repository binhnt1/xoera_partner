import { Dictionary } from "../domains/data/dictionary";

export class EnumHelper {
    public static ExportDictionary(type: any): Dictionary[] {
        let result: Dictionary[] = [];
        for (var item in type) {
            if (typeof type[item] === 'number') {
                result.push({
                    key: type[item],
                    value: item
                });
            }
        }
        if (!result || result.length == 0) {
            for (var item in type) {
                result.push({
                    key: type[item],
                    value: item
                });
            }
        }
        return result;
    }
}