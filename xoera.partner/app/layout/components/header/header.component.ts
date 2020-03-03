import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UserDto } from '../../../domains/objects/user.dto';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { MenuPageDto } from '../../../domains/objects/menu.page.dto';
import { ResultApi } from '../../../../../mvc/domains/data/result.api';
import { RouterHelper } from '../../../../../mvc/helpers/router.helper';
import { ResultType } from '../../../../../mvc/domains/enums/result.type';
import { MenuPageEntity } from '../../../domains/entities/menu.page.entity';

@Component({
    styleUrls: ['./header.scss'],
    templateUrl: 'header.component.html',
    selector: 'xoera-partner-layout-header',
})
export class XoeraPartnerLayoutHeaderComponent implements OnInit {
    account: UserDto;
    accountLetter: string;
    pages: MenuPageDto[];

    constructor(
        public router: Router,
        public data: DataService,
        public authen: AuthService,
        public service: ApiService) {
        if (this.authen.account) {
            this.loadFunctions();
        }
    }

    ngOnInit() {
        this.account = this.authen.account;
        this.accountLetter = this.account.UserName.substr(0, 1).toUpperCase();
    }

    logout() {
        this.authen.logout();
    }

    lock() {
        this.authen.lock();
    }

    public loadFunctions() {
        if (this.data.pages) this.pages = _.cloneDeep(this.data.pages);
        else {
            this.service.menupages().then((result: ResultApi) => {
                if (result.Type == ResultType.Success) {
                    this.pages = [];
                    let pages = <MenuPageEntity[]>result.Object;
                    if (pages && pages.length > 0) {
                        pages = _.sortBy(pages, c => c.Order);
                        pages.forEach((item: MenuPageEntity) => {
                            if (!item.ParentId) {
                                let dto: MenuPageDto = <MenuPageDto>item,
                                    itemsF1 = pages.filter(c => c.ParentId == item.Id);
                                if (itemsF1 && itemsF1.length > 0) {
                                    dto.Childrens = [];
                                    itemsF1.forEach((itemF1: MenuPageEntity) => {
                                        if (!itemF1.Icon && !itemF1.SvgIcon)
                                            itemF1.SvgIcon = '<i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i>';
                                        let dtoF1: MenuPageDto = <MenuPageDto>itemF1;
                                        dto.Childrens.push(dtoF1);
                                    });
                                }
                                this.pages.push(dto);
                            }
                        });
                    }
                    this.data.pages = _.cloneDeep(this.pages);
                }
            });
        }
    }

    public navigateProfile() {
        RouterHelper.Navigate(this.router, '/profile');
    }

    public navigateLicence() {
        RouterHelper.Navigate(this.router, '/licence');
    }

    public navigateDashBoard() {
        RouterHelper.Navigate(this.router, '/dashboard');
    }

    public navigate(item: MenuPageDto) {
        if (item.Link) {
            let url = item.Link;
            RouterHelper.Navigate(this.router, url.toLowerCase());
        }
    }
}
