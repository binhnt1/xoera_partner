import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AppConfig } from '../../../helpers/app.config';
import { ResultApi } from '../../../domains/data/result.api';
import { RouterHelper } from '../../../helpers/router.helper';
import { MvcApiService } from '../../../services/api.service';
import { TableDto } from '../../../domains/objects/table.dto';
import { MvcDataService } from '../../../services/data.service';
import { MvcAuthService } from '../../../services/auth.service';
import { ResultType } from '../../../domains/enums/result.type';
import { DatabaseDto } from '../../../domains/objects/database.dto';
import { FunctionDto } from '../../../domains/objects/function.dto';
import { FunctionEntity } from '../../../domains/entities/function.entity';

@Component({
    selector: 'layout-metronic-sidebar',
    templateUrl: 'sidebar.component.html'
})
export class LayoutMetronicSidebarComponent {
    public db = false;
    public databases: DatabaseDto[];
    public functions: FunctionDto[];
    public selectedDatabase: DatabaseDto;
    public selectedFunction: FunctionDto;

    constructor(
        public router: Router,
        public data: MvcDataService,
        public authen: MvcAuthService,
        public service: MvcApiService) {
        if (this.authen.account) {
            this.db = this.router.routerState.snapshot.url.indexOf('/sync') >= 0;
            if (this.db) {
                this.loadDatabases();
            } else this.loadFunctions();
        }
    }

    public selectDatabase(item: DatabaseDto) {
        this.selectedDatabase = item;
    }

    public loadDatabases() {
        this.service.databases().then((result: ResultApi) => {
            if (result.Type == ResultType.Success) {
                this.databases = <DatabaseDto[]>result.Object;
            }
        });
    }

    public loadFunctions() {
        if (this.data.functions) this.functions = _.cloneDeep(this.data.functions);
        else {
            this.service.selectAll('Function', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result.Type == ResultType.Success) {
                    this.functions = [];
                    let functions = <FunctionEntity[]>result.Object;
                    if (functions && functions.length > 0) {
                        functions = _.sortBy(functions, c => c.Order);
                        functions.forEach((item: FunctionEntity) => {
                            item.Controller = item.Controller && item.Controller.indexOf('admin/') >= 0
                                ? item.Controller
                                : 'admin/' + item.Controller;
                            if (!item.ParentId) {
                                let dto: FunctionDto = <FunctionDto>item,
                                    itemsF1 = functions.filter(c => c.ParentId == item.Id);
                                if (itemsF1 && itemsF1.length > 0) {
                                    dto.Functions = [];
                                    itemsF1.forEach((itemF1: FunctionEntity) => {
                                        itemF1.Controller = itemF1.Controller.indexOf('admin/') >= 0 ? itemF1.Controller : 'admin/' + itemF1.Controller;
                                        if (!itemF1.Icon && !itemF1.SvgIcon)
                                            itemF1.SvgIcon = '<i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i>';
                                        let dtoF1: FunctionDto = <FunctionDto>itemF1;
                                        dto.Functions.push(dtoF1);
                                    });
                                }
                                this.functions.push(dto);
                            }
                        });
                    }
                    this.data.functions = _.cloneDeep(this.functions);
                }
            });
        }
    }

    public loadTables(item: DatabaseDto) {
        this.selectedDatabase = item;
        this.selectedDatabase.Expand = !this.selectedDatabase.Expand;
        this.service.tables().then((result: ResultApi) => {
            if (result.Type == ResultType.Success) {
                item.Tables = <TableDto[]>result.Object;
            }
        });
    }

    public navigate(item: FunctionDto) {
        if (item.Controller) {
            let url = item.Controller;
            if (item.Action)
                url += '/' + item.Action;
            RouterHelper.Navigate(this.router, url.toLowerCase());
        }
    }

    public navigateDashBoard() {
        RouterHelper.Navigate(this.router, '/admin/dashboard');
    }
}
