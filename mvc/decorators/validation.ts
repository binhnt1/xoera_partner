import "reflect-metadata";
import { ConstantHelper } from "../helpers/constant.helper";

export function register(target: string, property: string, decorator: any) {
    let map: Map<string, any>;

    if (ConstantHelper.REGISTRY_METADATA.has(target)) {
        map = ConstantHelper.REGISTRY_METADATA.get(target);
    } else {
        map = new Map<string, any>();
        ConstantHelper.REGISTRY_METADATA.set(target, map);
    }
    if (!map.has(property)) {
        map.set(property, decorator);
    }
}