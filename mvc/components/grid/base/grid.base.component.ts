import * as _ from "lodash";
import { Router } from "@angular/router";
import { EnumHelper } from "../../../helpers/enum.helper";
import { TableEx } from "../../../decorators/table.decorator";
import { Dictionary } from "../../../domains/data/dictionary";
import { ActionData } from "../../../domains/data/action.data";
import { PagingData } from "../../../domains/data/paging.data";
import { FilterData } from "../../../domains/data/filter.data";
import { FilterType } from "../../../domains/enums/filter.type";
import { MvcDataService } from "../../../services/data.service";
import { SortingData } from "../../../domains/data/sorting.data";
import { BaseEntity } from "../../../domains/entities/base.entity";
import { DecoratorHelper } from "../../../helpers/decorator.helper";
import { OptionGridData } from "../../../domains/data/option.grid.data";
import { FilterBoolTypeAware } from "../../../domains/enums/filter.bool.type";
import { OrderTypeAware, OrderType } from "../../../domains/enums/order.type";
import { ObjectEx, ObjectExHelper } from "../../../decorators/object.decorator";
import { CompareType, CompareTypeAware } from "../../../domains/enums/compare.type";
import { DataTypeAware, BooleanTypeAware, DropDownTypeAware, DataType, DropdownLayoutTypeAware } from "../../../domains/enums/data.type";

@DataTypeAware
@OrderTypeAware
@BooleanTypeAware
@CompareTypeAware
@DropDownTypeAware
@FilterBoolTypeAware
@DropdownLayoutTypeAware
export class GridBaseComponent {
    tools: ActionData[];
    actions: ActionData[];

    local: boolean;
    loading: boolean;
    items: BaseEntity[];
    headers: ObjectEx[];
    activedTab: any = {};
    decorators: ObjectEx[];
    selectedFilter: string;

    to: number;
    from: number;
    size: number = 20;
    numbers: number[];
    primaryKey: string;
    controller: string;
    sizes: Dictionary[];
    pagingData: PagingData;

    boolFilterTypes: Dictionary[] = [];
    numberFilterTypes: Dictionary[] = [];
    stringFilterTypes: Dictionary[] = [];
    foreignFilterTypes: Dictionary[] = [];
    datetimeFilterTypes: Dictionary[] = [];

    constructor(
        public target: any,
        public router: Router,
        public data?: MvcDataService,
        public options?: OptionGridData,
        public menuTools?: ActionData[],
        public menuActions?: ActionData[]) {
        this.renderPageSize();
        this.loadDataSource(target, data, options);

        let table: TableEx = DecoratorHelper.DecoratorClass(target);
        this.controller = table && table.name.toLowerCase();

        let compares = EnumHelper.ExportDictionary(CompareType);
        compares.forEach((item: Dictionary) => {
            let name = ObjectExHelper.CreateLabel((<string>item.value).split('_')[1]);
            if ((<string>item.value).startsWith('B'))
                this.boolFilterTypes.push(new Dictionary(item.key, name));
            else if ((<string>item.value).startsWith('N'))
                this.numberFilterTypes.push(new Dictionary(item.key, name));
            else if ((<string>item.value).startsWith('S'))
                this.stringFilterTypes.push(new Dictionary(item.key, name));
            else if ((<string>item.value).startsWith('F'))
                this.foreignFilterTypes.push(new Dictionary(item.key, name));
            else if ((<string>item.value).startsWith('D'))
                this.datetimeFilterTypes.push(new Dictionary(item.key, name));
        });

        this.tools = menuTools;
        if (this.tools == undefined || this.tools == null) {
            this.tools = [];
            this.tools.push(ActionData.toolboxViewAll(this.router));
            this.tools.push(ActionData.toolboxViewActive(this.router));
            this.tools.push(ActionData.toolboxViewInActive(this.router));
            this.tools.push(ActionData.toolboxViewTrash(this.router));
            this.tools.push(ActionData.toolboxDivider());
            this.tools.push(ActionData.toolboxExportPdf(this.router));
            this.tools.push(ActionData.toolboxExportCsv(this.router));
            this.tools.push(ActionData.toolboxExportExcel(this.router));
            this.tools.push(ActionData.toolboxDivider());
            this.tools.push(ActionData.toolboxRefresh(this.router));
        }

        this.actions = menuActions;
        if (this.actions == undefined || this.actions == null) {
            this.actions = [];
            this.actions.push(ActionData.addNew(this.router));
        }
    }

    public loadDataSource(target: any, data: MvcDataService, options?: OptionGridData) {
        this.data = data;
        this.loading = true;
        this.target = target;
        this.options = options;
        if (this.data) {
            let local = this.options && this.options.local;
            if (local) {
                this.data.localEntities(target, this.options, (items: any[], paging, decorators: ObjectEx[]) => {
                    this.renderDataTable(items, paging, decorators);
                });
            } else {
                let filters = options && options.filters;
                this.data.entities(target, filters, (items: any[], paging, decorators: ObjectEx[]) => {
                    this.renderDataTable(items, paging, decorators);
                });
            }
        } else this.loading = false;
    }

    public sort(decorator: ObjectEx) {
        if (decorator && decorator.allowSort) {
            this.loading = true;
            let type = decorator.orderData && decorator.orderData.type;
            if (type) type = type == OrderType.Asc
                ? OrderType.Desc
                : OrderType.Asc;
            else type = OrderType.Asc;
            let sort: SortingData = {
                name: decorator.column,
                type: type,
            };
            let local = this.options && this.options.local;
            if (local) {
                let sorts: SortingData[] = (this.options && this.options.orders) || []
                let sortDb = sorts.find(c => c.name == sort.name);
                if (sortDb) {
                    _.remove(sorts, c => c.name == sort.name);
                }
                sorts = [sort];
                if (!this.options)
                    this.options = new OptionGridData();
                this.options.orders = sorts;
                this.data.localEntities(this.target, this.options, (items: any[], paging, decorators: ObjectEx[]) => {
                    this.renderDataTable(items, paging, decorators);
                });
            } else {
                this.data.sorting(sort);
            }
        }
    }

    public filter(decorator: ObjectEx) {
        if (decorator && decorator.allowFilter) {
            this.loading = false;
            let filter = decorator.filterData || new FilterData(),
                basic = !this.activedTab[decorator.property] || this.activedTab[decorator.property] == 'basic';
            if (basic) {
                let compare: CompareType = CompareType.N_Contains;
                switch (decorator.dataType) {
                    case DataType.Number: compare = CompareType.N_Contains; break;
                    case DataType.String: compare = CompareType.S_Contains; break;
                    case DataType.Boolean: compare = CompareType.B_Contains; break;
                    case DataType.DateTime: compare = CompareType.D_Contains; break;
                    case DataType.DropDown: compare = CompareType.F_Contains; break;
                }
                this.data.filter({
                    value1: null,
                    value2: null,
                    compare: compare,
                    value: filter.value,
                    type: FilterType.And,
                    name: decorator.column,
                });
            } else {
                this.data.filter({
                    value: null,
                    type: FilterType.And,
                    value1: filter.value1,
                    value2: filter.value2,
                    name: decorator.column,
                    compare: filter.compare || CompareType.N_Contains,
                });
            }
        }
        this.closeFilterMenu();
    }

    public resetFilter(decorator: ObjectEx) {
        decorator.filterData = new FilterData();
        this.closeFilterMenu();
        this.data.filter();
    }

    public paging(index?: number, size?: number) {
        this.loading = true;
        let local = this.options && this.options.local;
        if (local) {
            if (!this.options)
                this.options = new OptionGridData();
            if (!this.options.paging)
                this.options.paging = new PagingData();
            this.options.paging.size = size;
            this.options.paging.index = index;
            this.data.localEntities(this.target, this.options, (items: any[], paging, decorators: ObjectEx[]) => {
                this.renderDataTable(items, paging, decorators);
            });
        } else {
            this.data.paging(index, size);
        }
    }

    private initPaging() {
        this.numbers = [];
        this.to = this.pagingData.index * this.pagingData.size;
        if (this.pagingData.total < this.to) {
            this.to = this.pagingData.total;
        }
        this.from = this.to == 0 ? 0 : ((this.pagingData.index - 1) * this.pagingData.size) + 1;

        var startIndex = this.pagingData.index - 3;
        if (startIndex <= 1) {
            startIndex = 1;
        }
        var endIndex = this.pagingData.index + 1;
        if (endIndex <= 5) {
            endIndex = this.pagingData.pages > 5 ? 5 : this.pagingData.pages;
        }
        else if (endIndex > this.pagingData.pages) {
            endIndex = this.pagingData.pages;
        }
        for (var i = startIndex; i <= endIndex; i++) {
            this.numbers.push(i);
        }
    }

    private renderPageSize() {
        this.sizes = [
            { key: 10, value: 10 },
            { key: 20, value: 20 },
            { key: 50, value: 50 },
            { key: 100, value: 100 },
            { key: 150, value: 150 },
            { key: 200, value: 200 },
        ];

        // render editor
        let interval = setInterval(() => {
            let $element = <any>jQuery('#page_size_select');
            if ($element && $element.length > 0) {
                clearInterval(interval);
                $element.selectpicker({
                    iconBase: 'fa',
                    tickIcon: 'fa-check'
                }).on('changed.bs.select', (e: any, clickedIndex: number) => {
                    this.size = this.sizes[clickedIndex].key;
                    this.paging(null, this.size);
                });
            }
        }, 100);
    }

    public closeFilterMenu() {
        this.selectedFilter = null;
    }

    public toggleFilterMenu(decorator?: ObjectEx) {
        if (decorator) {
            if (this.selectedFilter == decorator.property)
                this.selectedFilter = null;
            else setTimeout(() => {
                this.selectedFilter = decorator.property;
                if (!this.activedTab[decorator.property])
                    this.activedTab[decorator.property] = 'basic';
            }, 10);
        } else this.selectedFilter = null;
    }

    public activeTab(decorator: ObjectEx, tab: string) {
        this.activedTab[decorator.property] = tab;
    }

    private async renderDataTable(items: any[], paging: PagingData, decorators: ObjectEx[]) {
        this.pagingData = paging;
        let primaryKey = decorators.find(c => c.primaryKey);
        this.primaryKey = primaryKey && primaryKey.property || 'Id';
        let gridDecorators = _.cloneDeep(decorators).filter(c => c.showInGrid);
        if (gridDecorators) {
            this.headers = _.cloneDeep(gridDecorators);
            gridDecorators.forEach((decorator: ObjectEx) => {
                decorator.label = '';
                decorator.valid = true;
                decorator.message = '';
                decorator.editable = false;
                decorator.filterData = new FilterData();
                decorator.filterData.type = FilterType.And;
                decorator.filterData.name = decorator.property;
            });
        }
        if (items && items.length > 0 && items.length < this.size) {
            let count = this.size - items.length;
            for (let i = 0; i < count; i++) {
                items.push(null);
            }
        }
        this.decorators = gridDecorators;
        this.loading = false;
        this.items = items;
        this.initPaging();
    }
}
