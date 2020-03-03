declare var jQuery;
import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { MvcAuthService } from "../../../../../../mvc/services/auth.service";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { OrderType } from "../../../../../../mvc/domains/enums/order.type";
import { PagingData } from "../../../../../../mvc/domains/data/paging.data";
import { FilterData } from "../../../../../../mvc/domains/data/filter.data";
import { ResultType } from "../../../../../../mvc/domains/enums/result.type";
import { FilterType } from "../../../../../../mvc/domains/enums/filter.type";
import { SortingData } from "../../../../../../mvc/domains/data/sorting.data";
import { CompareType } from "../../../../../../mvc/domains/enums/compare.type";
import { AlignTypeAware } from "../../../../../../mvc/domains/enums/align.type";
import { AccountEntity } from "../../../../../../mvc/domains/entities/account.entity";
import { TicketDto } from "../../../../domains/objects/ticket.dto";
import { UserEntity } from "../../../../domains/entities/user.entity";
import { TicketEntity } from "../../../../domains/entities/ticket.entity";
import { TicketPriorityTypeAware } from "../../../../domains/enums/ticket.priority.type";
import { TicketCategoryEntity } from "../../../../domains/entities/ticket.category.entity";
import { TicketStatusTypeAware, TicketStatusType } from "../../../../domains/enums/ticket.status.type";

@AlignTypeAware
@TicketStatusTypeAware
@TicketPriorityTypeAware
@Component({
    styleUrls: ['./ticket.grid.scss'],
    templateUrl: './ticket.grid.component.html',
})
export class TicketGridComponent {
    to: number;
    from: number;
    loading: boolean;
    numbers: number[];
    paging: PagingData;
    tickets: TicketDto[];
    pageSize: number = 20;
    pageIndex: number = 1;
    filters: FilterData[];
    orders: SortingData[];
    adminController: boolean;
    ticketStatusType: TicketStatusType;

    users: UserEntity[];
    accounts: AccountEntity[];
    ticketCategories: TicketCategoryEntity[];

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService,
        public mvcAuth: MvcAuthService) {
        this.ticketStatusType = TicketStatusType.Open;
        this.pageIndex = RouterHelper.getPageIndex(this.router);
        this.adminController = RouterHelper.GetController(this.router) == 'admin';
        if (this.adminController) {
            let account = this.mvcAuth.account;
            if (account) {
                this.filters = [
                    { name: 'StatusType', type: FilterType.And, compare: CompareType.N_Equals, value: <number>this.ticketStatusType }
                ];
                this.orders = [
                    { name: 'DateTime', type: OrderType.Desc }
                ];
                this.loadTickets();
            }
        } else {
            let account = this.auth.account;
            if (account) {
                this.filters = [
                    { name: 'UserId', type: FilterType.And, compare: CompareType.N_Equals, value: account.Id },
                    { name: 'StatusType', type: FilterType.And, compare: CompareType.N_Equals, value: <number>this.ticketStatusType }
                ];
                this.orders = [
                    { name: 'DateTime', type: OrderType.Desc }
                ];
                this.loadTickets();
            }
        }
    }

    navigate(pageIndex: number) {
        let router = this.router,
            url = this.router.url,
            urlTree = router.parseUrl(url),
            queryParams = urlTree.queryParams,
            segments = urlTree.root.children['primary'].segments;
        if (!queryParams) queryParams = {};
        if (pageIndex) queryParams['page'] = pageIndex;
        let segmentString = segments.join('/');
        RouterHelper.NavigateQueryParams(router, segmentString, queryParams, () => {
            this.pageIndex = pageIndex;
            this.loadTickets();
        });
    }

    navigateTicket(id?: number) {
        if (this.adminController) {
            RouterHelper.Navigate(this.router, '/admin/ticket/view', { id: id });
        } else {
            if (id)
                RouterHelper.Navigate(this.router, '/ticket/view', { id: id });
            else
                RouterHelper.Navigate(this.router, '/ticket/new');
        }
    }

    filterTickets(status?: TicketStatusType) {
        if (!status) {
            this.ticketStatusType = null;
            this.filters = this.filters.filter(c => c.name != 'StatusType');
            if (this.adminController) {
                let account = this.mvcAuth.account;
                if (account) {
                    this.orders = [
                        { name: 'DateTime', type: OrderType.Desc }
                    ];
                    this.loadTickets();
                }
            } else {
                let account = this.auth.account;
                if (account) {
                    this.filters = [
                        { name: 'UserId', type: FilterType.And, compare: CompareType.N_Equals, value: account.Id }
                    ];
                    this.orders = [
                        { name: 'DateTime', type: OrderType.Desc }
                    ];
                    this.loadTickets();
                }
            }
        } else {
            this.ticketStatusType = status;
            this.filters = this.filters.filter(c => c.name != 'StatusType');
            this.filters.push(
                { name: 'StatusType', type: FilterType.And, compare: CompareType.N_Equals, value: <number>status }
            );
            this.orders = [
                { name: 'DateTime', type: OrderType.Desc }
            ];
            this.loadTickets();
        }
    }

    private async loadUser() {
        if (!this.users) {
            await this.serive.selectAll('User', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success)
                    this.users = <UserEntity[]>result.Object;
            });
        }
    }

    private async loadAccount() {
        if (!this.accounts) {
            await this.serive.selectAll('Account', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success)
                    this.accounts = <AccountEntity[]>result.Object;
            });
        }
    }

    private async loadTickets() {
        this.loading = true;
        await this.loadUser();
        await this.loadAccount();
        await this.loadTicketCategories();
        this.serive.selectAll('Ticket', null, this.filters, this.orders, this.pageIndex, this.pageSize).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                let tickets = <TicketEntity[]>result.Object;
                if (tickets) {
                    this.tickets = [];
                    tickets.forEach(async (item: TicketEntity) => {
                        let ticket: TicketDto = new TicketEntity();
                        ticket.Id = item.Id;
                        ticket.Title = item.Title;
                        ticket.UserId = item.UserId;
                        ticket.Content = item.Content;
                        ticket.DateTime = item.DateTime;
                        ticket.AssignToId = item.AssignToId;
                        ticket.CategoryId = item.CategoryId;
                        ticket.StatusType = item.StatusType;
                        ticket.Attachments = item.Attachments;
                        ticket.PriorityType = item.PriorityType;
                        ticket.Count = await this.countOfTicket(item.Id);
                        ticket.User = this.users.find(c => c.Id == item.UserId);
                        ticket.AssignTo = this.accounts.find(c => c.Id == item.AssignToId);
                        ticket.Category = this.ticketCategories.find(c => c.Id == item.CategoryId);
                        this.tickets.push(ticket);
                    });
                }

                this.paging = <PagingData>result.ObjectExtra;
                this.initPaging();
            }
            this.loading = false;
            setTimeout(() => { (<any>jQuery('.tooltips')).tooltip(); }, 1000);
        });
    }

    private async loadTicketCategories() {
        if (!this.ticketCategories) {
            await this.serive.selectAll('TicketCategory', null, null, null, 1, 1000).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success)
                    this.ticketCategories = <TicketCategoryEntity[]>result.Object;
            });
        }
    }

    private async countOfTicket(id: number) {
        let filters = [
            { name: 'TicketId', type: FilterType.And, compare: CompareType.N_Equals, value: id },
            { name: 'Content', type: FilterType.And, compare: CompareType.S_NotEquals, value: null },
        ];
        return await this.serive.count('TicketDetail', filters).then((result: ResultApi) => {
            return result && result.Type == ResultType.Success ? parseInt(result.Object) : 0;
        });
    }

    private initPaging() {
        this.numbers = [];
        this.to = this.paging.index * this.paging.size;
        if (this.paging.total < this.to) {
            this.to = this.paging.total;
        }
        this.from = this.to == 0 ? 0 : ((this.paging.index - 1) * this.paging.size) + 1;

        var startIndex = this.paging.index - 3;
        if (startIndex <= 1) {
            startIndex = 1;
        }
        var endIndex = this.paging.index + 1;
        if (endIndex <= 5) {
            endIndex = this.paging.pages > 5 ? 5 : this.paging.pages;
        }
        else if (endIndex > this.paging.pages) {
            endIndex = this.paging.pages;
        }
        for (var i = startIndex; i <= endIndex; i++) {
            this.numbers.push(i);
        }
    }
}
