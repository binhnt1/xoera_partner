import "reflect-metadata";
import * as _ from "lodash";
import { Router } from "@angular/router";
import { DecoratorHelper } from "./decorator.helper";
import { MvcApiService } from "../../mvc/services/api.service";
import { MvcEventService } from "../../mvc/services/event.service";
import { TableEx } from "../decorators/table.decorator";
import { ObjectEx } from "../decorators/object.decorator";

export class EntityHelper {

    constructor(
        public router: Router,
        public event: MvcEventService,
        public service: MvcApiService) {

    }

    public static CreateObject(className: string) {
        let item = {};
        let decorators = DecoratorHelper.DecoratorProperties(className);
        if (decorators) {
            decorators.forEach((decorator: ObjectEx) => {
                if (decorator.property)
                    item[decorator.property] = void 0;
            });
        }
        return item;
    }

    public static ToEntity(className: string, item?: any) {
        let entity = EntityHelper.CreateObject(className),
            tableEx: TableEx = DecoratorHelper.DecoratorClass(className);
        Object.defineProperty(entity, 'TableEx', {
            value: tableEx,
        });
        if (item) {
            let decorators = DecoratorHelper.DecoratorProperties(className);
            if (decorators) {
                decorators.forEach((decorator: ObjectEx) => {
                    if (decorator.property)
                        entity[decorator.property] = _.cloneDeep(item[decorator.property]);
                });
            }
        }
        return entity;
    }

    public static ToEntities(className: string, item: any[]) {
        return item.map(c => this.ToEntity(className, c));
    }

    public static ToEntityFromClass<T>(target: new () => T, item?: any) {
        let entity: T = <T>_.cloneDeep(item || {}),
            tableEx: TableEx = DecoratorHelper.DecoratorClass(target.name);
        Object.defineProperty(entity, 'TableEx', {
            value: tableEx,
        });
        return entity;
    }

    public static ToEntitiesFromClass<T>(target: new () => T, item: any[]) {
        return item.map(c => this.ToEntityFromClass<T>(target, c));
    }
}