import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AppConfig } from '../../../helpers/app.config';
import { Component, OnInit, Input } from '@angular/core';
import { ResultApi } from '../../../domains/data/result.api';
import { RouterHelper } from '../../../helpers/router.helper';
import { MvcApiService } from '../../../services/api.service';
import { MvcAuthService } from '../../../services/auth.service';
import { MvcDataService } from '../../../services/data.service';
import { ResultType } from '../../../domains/enums/result.type';
import { AccountDto } from '../../../domains/objects/account.dto';
import { FunctionDto } from '../../../domains/objects/function.dto';
import { DatabaseDto } from '../../../domains/objects/database.dto';
import { FunctionEntity } from '../../../domains/entities/function.entity';
import { ThemeType, ThemeTypeAware } from '../../../domains/enums/theme.type';

@ThemeTypeAware
@Component({
    styleUrls: ['./header.scss'],
    selector: 'layout-metronic-header',
    templateUrl: 'header.component.html'
})
export class LayoutMetronicHeaderComponent implements OnInit {
    db = false;
    account: AccountDto;
    accountLetter: string;
    databases: DatabaseDto[];
    functions: FunctionDto[];
    @Input() theme: ThemeType;

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

    ngOnInit() {
        this.account = this.authen.account;
        if (!this.theme) this.theme = ThemeType.Metronic;
        if (this.account && this.account.UserName)
            this.accountLetter = this.account.UserName.substr(0, 1).toUpperCase();
    }

    logout() {
        this.authen.logout();
    }

    lock() {
        this.authen.lock();
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
