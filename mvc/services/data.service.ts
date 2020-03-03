import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MvcApiService } from './api.service';
import { MvcEventService } from './event.service';
import { Subscription } from 'rxjs/Subscription';
import DataSource from 'devextreme/data/data_source';
import { AppConfig } from '../../mvc/helpers/app.config';
import { EnumHelper } from '../../mvc/helpers/enum.helper';
import { StoreHelper } from '../../mvc/helpers/store.helper';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { ResultApi } from '../../mvc/domains/data/result.api';
import { TableEx } from '../../mvc/decorators/table.decorator';
import { Dictionary } from '../../mvc/domains/data/dictionary';
import { TableDto } from '../../mvc/domains/objects/table.dto';
import { EntityHelper } from '../../mvc/helpers/entity.helper';
import { RouterHelper } from '../../mvc/helpers/router.helper';
import { PagingData } from '../../mvc/domains/data/paging.data';
import { FilterData } from '../../mvc/domains/data/filter.data';
import { ResultType } from '../../mvc/domains/enums/result.type';
import { ObjectEx } from '../../mvc/decorators/object.decorator';
import { UtilityHelper } from '../../mvc/helpers/utility.helper';
import { SortingData } from '../../mvc/domains/data/sorting.data';
import { OptionGridData } from '../domains/data/option.grid.data';
import { DecoratorHelper } from '../../mvc/helpers/decorator.helper';
import { DatabaseDto } from '../../mvc/domains/objects/database.dto';
import { DropDownEx } from '../../mvc/decorators/dropdown.decorator';
import { FunctionDto } from '../../mvc/domains/objects/function.dto';
import { DataType, DropDownType } from '../../mvc/domains/enums/data.type';

@Injectable()
export class MvcDataService {
    private target: any;
    public databases: DatabaseDto[];
    public functions: FunctionDto[];
    private fixFilters: FilterData[];
    private subQueryParam: Subscription;
    private complete: (items: any[], paging?: PagingData, decorators?: ObjectEx[]) => void;

    constructor(
        public router: Router,
        public event: MvcEventService,
        public service: MvcApiService) {
    }

    public filter(filter?: FilterData) {
        let router = this.router,
            url = this.router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            segments = urlTree.root.children['primary'].segments;
        if (!queryParams) queryParams = {};
        if (filter) {
            let filters: FilterData[] = queryParams['filters']
                ? <FilterData[]>JSON.parse(queryParams['filters'])
                : [];
            let filterDb = filters.find(c => c.name == filter.name);
            if (filterDb) {
                _.remove(filters, c => c.name == filter.name);
            }
            if (filter.value != null || filter.value1 != null)
                filters.push(filter);
            if (filters && filters.length > 0)
                queryParams['filters'] = JSON.stringify(filters);
            else
                delete queryParams['filters'];
            let segmentString = segments.join('/');
            RouterHelper.NavigateQueryParams(router, segmentString, queryParams, () => {
                this.event.ReloadDatagrid.emit();
            });
        } else {
            delete queryParams['filters'];
            let segmentString = segments.join('/');
            RouterHelper.NavigateQueryParams(router, segmentString, queryParams, () => {
                this.event.ReloadDatagrid.emit();
            });
        }
    }

    public sorting(sort: SortingData) {
        let router = this.router,
            url = this.router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            segments = urlTree.root.children['primary'].segments;
        if (!queryParams) queryParams = {};
        let sorts: SortingData[] = queryParams['orders']
            ? <SortingData[]>JSON.parse(queryParams['orders'])
            : [];
        let sortDb = sorts.find(c => c.name == sort.name);
        if (sortDb) {
            _.remove(sorts, c => c.name == sort.name);
        }
        sorts = [sort];
        queryParams['orders'] = JSON.stringify(sorts);
        let segmentString = segments.join('/');
        RouterHelper.NavigateQueryParams(router, segmentString, queryParams, () => {
            this.event.ReloadDatagrid.emit();
        });
    }

    public paging(index?: number, size?: number) {
        let router = this.router,
            url = this.router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            segments = urlTree.root.children['primary'].segments;
        if (!queryParams) queryParams = {};
        if (size) queryParams['size'] = size;
        if (index) queryParams['page'] = index;
        let segmentString = segments.join('/');
        RouterHelper.NavigateQueryParams(router, segmentString, queryParams, () => {
            this.event.ReloadDatagrid.emit();
        });
    }

    public async addReferenceOfBoolean(decorator: ObjectEx) {
        let items: Dictionary[] = [],
            item: DropDownEx = <DropDownEx>decorator,
            referenceKey = UtilityHelper.referenceKey(item),
            references = StoreHelper.DataReferences.get(referenceKey);
        if (references && references.length > 0) return;

        if (item.emptyItem) {
            items.push(item.emptyItem);
        }
        if (item.items && item.items.length > 0) {
            let array = item.items.map(c => new Dictionary(c, c));
            if (array && array.length > 0) {
                array.forEach((itemArray: Dictionary) => {
                    if (item.renderHtmlRaw) {
                        items.push({
                            key: itemArray.key,
                            value: UtilityHelper.replace(item.renderHtmlRaw, '{value}', itemArray.value)
                        });
                    } else items.push(itemArray);
                });
            }
            StoreHelper.DataReferences.set(referenceKey, items);
        } else if (item.enumType) {
            let array = EnumHelper.ExportDictionary(item.enumType);
            if (array && array.length > 0) {
                array.forEach((itemArray: Dictionary) => {
                    if (item.renderHtmlRaw) {
                        items.push({
                            key: itemArray.key,
                            value: UtilityHelper.replace(item.renderHtmlRaw, '{value}', itemArray.value)
                        });
                    } else items.push(itemArray);
                });
            }
            StoreHelper.DataReferences.set(referenceKey, items);
        }
    }

    public async addReferenceOfDropDown(decorator: ObjectEx) {
        let items: Dictionary[] = [],
            item: DropDownEx = <DropDownEx>decorator,
            referenceKey = UtilityHelper.referenceKey(item),
            references = StoreHelper.DataReferences.get(referenceKey);
        if (references && references.length > 0) return;
        if (item.emptyItem) {
            items.push(item.emptyItem);
        }
        if (item.items && item.items.length > 0) {
            let array = item.items.map(c => new Dictionary(c, c));
            if (array && array.length > 0) {
                array.forEach((itemArray: Dictionary) => {
                    if (item.renderHtmlRaw) {
                        items.push({
                            key: itemArray.key,
                            value: UtilityHelper.replace(item.renderHtmlRaw, '{value}', itemArray.value)
                        });
                    } else items.push(itemArray);
                });
            }
            item.data = _.cloneDeep(items);
        } else if (item.enumType) {
            let array = EnumHelper.ExportDictionary(item.enumType);
            if (array && array.length > 0) {
                array.forEach((itemArray: Dictionary) => {
                    if (item.renderHtmlRaw) {
                        items.push({
                            key: itemArray.key,
                            value: UtilityHelper.replace(item.renderHtmlRaw, '{value}', itemArray.value)
                        });
                    } else items.push(itemArray);
                });
            }
            item.data = _.cloneDeep(items);
        } else if (item.reference) {
            let array: Dictionary[] = [];
            let columns = item.propertyValue == item.propertyDisplay.join(',')
                ? item.propertyValue
                : item.propertyValue + ',' + item.propertyDisplay.join(',');
            if (item.reference.name == TableDto.name) {
                await this.service.tables().then((result: ResultApi) => {
                    if (result.Type == ResultType.Success) {
                        let objects: any[] = result.Object;
                        if (objects && objects.length > 0) {
                            objects.forEach((obj: any) => {
                                let display = '',
                                    value = obj[item.propertyValue];
                                item.propertyDisplay.forEach((property: string) => {
                                    if (obj[property])
                                        display += display ? ' - ' + obj[property] : obj[property];
                                });
                                array.push(new Dictionary(value, display));
                            });
                        }
                    }
                });
            } else {
                if (item.type == DropDownType.DropdownGrid) {
                    let decoratorClass = DecoratorHelper.DecoratorClass(item.reference);
                    item.dataSource = new DataSource({
                        store: createStore({
                            loadUrl: AppConfig.ApiUrl + '/curd/FindAllByTEntityForCombobox?table=' + decoratorClass.name,
                            onBeforeSend: (r, s) => {
                            },
                            key: item.propertyValue
                        })
                    });
                } else if (item.type == DropDownType.DropdownDevexpress) {
                    let decoratorClass = DecoratorHelper.DecoratorClass(item.reference);
                    item.dataSource = new DataSource({
                        store: createStore({
                            loadUrl: AppConfig.ApiUrl + '/curd/FindAllForCombobox?table=' + decoratorClass.name + '&columns=' + columns,
                            onBeforeSend: (r, s) => {
                            },
                            key: item.propertyValue
                        })
                    });
                } else {
                    let decoratorClass = DecoratorHelper.DecoratorClass(item.reference);
                    await this.service.selectAll(decoratorClass.name, columns, null, null, 1, 10000).then((result: ResultApi) => {
                        if (result.Type == ResultType.Success) {
                            let objects: any[] = result.Object;
                            if (objects && objects.length > 0) {
                                let hash: any[] = [];
                                objects.forEach((obj: any) => {
                                    let display = '',
                                        value = obj[item.propertyValue];
                                    if (hash.indexOf(value) >= 0) return;

                                    hash.push(value);
                                    item.propertyDisplay.forEach((property: string) => {
                                        if (obj[property])
                                            display += display ? ' - ' + obj[property] : obj[property];
                                    });
                                    array.push(new Dictionary(value, display));
                                });
                            }
                        }
                    });
                }
            }
            if (array && array.length > 0) {
                array.forEach((itemArray: Dictionary) => {
                    if (item.renderHtmlRaw) {
                        items.push({
                            key: itemArray.key,
                            value: UtilityHelper.replace(item.renderHtmlRaw, '{value}', itemArray.value)
                        });
                    } else items.push(itemArray);
                });
            }
            StoreHelper.DataReferences.set(referenceKey, items);
        }
    }

    public addFilterParams(target: any, column: string, callback: (items: string[]) => void) {
        let array: string[] = [],
            table = DecoratorHelper.DecoratorClass(target);
        this.service.selectAll(table.name, column, null, null, 1, 10000).then((result: ResultApi) => {
            if (result.Type == ResultType.Success) {
                let objects: any[] = result.Object;
                if (objects && objects.length > 0) {
                    objects.forEach((obj: any) => {
                        let value = obj[column];
                        if (array.indexOf(value) >= 0)
                            return;
                        array.push(value);
                    });
                    if (callback) callback(array);
                }
            }
        });
    }

    public async decorator(className: string, propertyName: string): Promise<ObjectEx> {
        let decorator = <ObjectEx>DecoratorHelper.DecoratorProperty(className, propertyName);
        if (decorator) {
            decorator.property = propertyName;
            if (!decorator.table) {
                let temp = DecoratorHelper.DecoratorClass(className);
                decorator.table = temp && temp.name;
            }
            if (!decorator.column) decorator.column = propertyName;
            if (decorator.dataType == DataType.DropDown) {
                await this.addReferenceOfDropDown(decorator);
            } else if (decorator.dataType == DataType.Boolean) {
                await this.addReferenceOfBoolean(decorator);
            }
        }
        return decorator;
    }

    public async entity(target: any, complete: (item: any, decorators?: ObjectEx[]) => void) {
        let objId = RouterHelper.getId(this.router),
            table = DecoratorHelper.DecoratorClass(target);
        if (objId) {
            this.service.selectOne(table.name, objId).then(async (result: ResultApi) => {
                if (result.Type == ResultType.Success) {
                    let item = EntityHelper.ToEntity(table.className, result.Object),
                        decorators = await this.decorators(item, table)
                    if (complete) complete(item, decorators);
                    this.event.EditEntity.emit(item);
                }
            });
        } else if (RouterHelper.IsEditPage(this.router)) {
            RouterHelper.NavigateToNewPage(this.router);
        } else {
            let item = EntityHelper.ToEntity(table.className),
                decorators = await this.decorators(item, table);
            if (complete) complete(item, decorators);
            this.event.EditEntity.emit(item);
        }
    }

    public entities(target: any, fixFilters: FilterData[], complete?: (items: any[], paging?: PagingData, decorators?: ObjectEx[]) => void) {
        this.target = target;
        this.complete = complete;
        this.fixFilters = fixFilters;
        let orders = RouterHelper.getOrders(this.router),
            columns = RouterHelper.getColumns(this.router),
            filters = RouterHelper.getFilters(this.router),
            pageSize = RouterHelper.getPageSize(this.router),
            pageIndex = RouterHelper.getPageIndex(this.router),
            table: TableEx = DecoratorHelper.DecoratorClass(target),
            orderDatas: SortingData[] = orders ? JSON.parse(orders) : [],
            filterDatas: FilterData[] = filters ? JSON.parse(filters) : [];
        if (fixFilters && fixFilters.length > 0) {
            fixFilters.forEach((item: FilterData) => {
                filterDatas.unshift(item);
            });
            filters = JSON.stringify(filterDatas);
        }
        this.service.selectAll(table.name, columns, filters, orders, pageIndex, pageSize).then(async (result: ResultApi) => {
            if (result.Type == ResultType.Success) {
                let paging: PagingData = <PagingData>result.ObjectExtra,
                    items = EntityHelper.ToEntities(table.className, result.Object),
                    decorators = await this.decorators(items && items.length > 0 && items[0], table);
                if (decorators) {
                    decorators = _.sortBy(decorators, c => c.order);
                    decorators.forEach((decorator: ObjectEx) => {
                        decorator.orderData = orderDatas.find(c => c.name == decorator.column) || new SortingData();
                        decorator.filterData = filterDatas.find(c => c.name == decorator.column) || new FilterData();
                    });
                    if (orders) {
                        let items = <SortingData[]>JSON.parse(orders);
                        if (items && items.length > 0) {
                            items.forEach((sort: SortingData) => {
                                let decorator = decorators.find(c => c.column == sort.name);
                                if (decorator) decorator.orderData = sort;
                            });
                        }
                    }
                    if (filters) {
                        let items = <FilterData[]>JSON.parse(filters);
                        if (items && items.length > 0) {
                            items.forEach((filter: FilterData) => {
                                let decorator = decorators.find(c => c.column == filter.name);
                                if (decorator) decorator.filterData = filter;
                            });
                        }
                    }
                }
                if (complete) complete(items, paging, decorators);
            }
        });
        if (!this.subQueryParam) {
            this.subQueryParam = this.event.ReloadDatagrid.subscribe(() => {
                this.entities(this.target, this.fixFilters, this.complete);
            });
        }
    }

    public localEntities(target: any, options: OptionGridData, complete?: (items: any[], paging?: PagingData, decorators?: ObjectEx[]) => void) {
        this.target = target;
        this.complete = complete;
        let table: TableEx = DecoratorHelper.DecoratorClass(target),
            pageSize = (options && options.paging && options.paging.size) || 20,
            pageIndex = (options && options.paging && options.paging.index) || 1,
            orders = options && options.orders && JSON.stringify(options.orders),
            columns = options && options.columns && JSON.stringify(options.columns),
            filters = options && options.filters && JSON.stringify(options.filters),
            orderDatas: SortingData[] = orders ? JSON.parse(orders) : [],
            filterDatas: FilterData[] = filters ? JSON.parse(filters) : [];
        this.service.selectAll(table.name, columns, filters, orders, pageIndex, pageSize).then(async (result: ResultApi) => {
            if (result.Type == ResultType.Success) {
                let paging: PagingData = <PagingData>result.ObjectExtra,
                    items = EntityHelper.ToEntities(table.className, result.Object),
                    decorators = await this.decorators(items && items.length > 0 && items[0], table);
                if (decorators) {
                    decorators = _.sortBy(decorators, c => c.order);
                    decorators.forEach((decorator: ObjectEx) => {
                        decorator.orderData = orderDatas.find(c => c.name == decorator.column) || new SortingData();
                        decorator.filterData = filterDatas.find(c => c.name == decorator.column) || new FilterData();
                    });
                    if (orders) {
                        let items = <SortingData[]>JSON.parse(orders);
                        if (items && items.length > 0) {
                            items.forEach((sort: SortingData) => {
                                let decorator = decorators.find(c => c.column == sort.name);
                                if (decorator) decorator.orderData = sort;
                            });
                        }
                    }
                    if (filters) {
                        let items = <FilterData[]>JSON.parse(filters);
                        if (items && items.length > 0) {
                            items.forEach((filter: FilterData) => {
                                let decorator = decorators.find(c => c.column == filter.name);
                                if (decorator) decorator.filterData = filter;
                            });
                        }
                    }
                }
                if (complete) complete(items, paging, decorators);
            }
        });
    }

    public async decorators(obj: any, table: TableEx, addReference: boolean = true): Promise<ObjectEx[]> {
        let result: ObjectEx[] = [];
        let properties = Object.getOwnPropertyNames(obj);
        if (properties && properties.length > 0) {
            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];
                let decorator = <ObjectEx>DecoratorHelper.DecoratorProperty(table.className, property);
                if (decorator) {
                    result.push(decorator);
                    decorator.table = table.name;
                    decorator.property = property;
                    if (!decorator.column) decorator.column = property;
                    if (addReference) {
                        if (decorator.dataType == DataType.DropDown) {
                            await this.addReferenceOfDropDown(decorator);
                        } else if (decorator.dataType == DataType.Boolean) {
                            await this.addReferenceOfBoolean(decorator);
                        }
                    }
                }
            };
        }
        return result;
    }
}
