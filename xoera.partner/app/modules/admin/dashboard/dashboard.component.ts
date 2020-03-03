import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import { AppConfig } from "../../../../../mvc/helpers/app.config";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { MvcAuthService } from "../../../../../mvc/services/auth.service";
import { UtilityHelper } from "../../../../../mvc/helpers/utility.helper";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { TableDto } from "../../../../../mvc/domains/objects/table.dto";
import { FilterData } from "../../../../../mvc/domains/data/filter.data";
import { FilterType } from "../../../../../mvc/domains/enums/filter.type";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { ConstantHelper } from "../../../../../mvc/helpers/constant.helper";
import { CompareType } from "../../../../../mvc/domains/enums/compare.type";
import { DashboardItemDto } from "../../../domains/objects/dashboard.item.dto";

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  items: DashboardItemDto[];

  constructor(
    public router: Router,
    public data: DataService,
    public service: ApiService,
    public authen: MvcAuthService) {
  }

  ngOnInit() {
    this.loading = true;
    if (this.authen.account) {
      this.items = [];
      this.service.tables().then((result: ResultApi) => {
        if (result.Type == ResultType.Success) {
          let tables = <TableDto[]>result.Object;
          if (tables && tables.length > 0) {
            tables.forEach(async (table: TableDto) => {
              let count: number = table.Count, link: string, name: string;
              switch (table.Name.toLowerCase()) {
                case 'user': {
                  // account
                  let filterTrue: FilterData = {
                    value: true,
                    name: 'Approved',
                    compare: CompareType.B_Equals,
                  };
                  let filterAccounts: FilterData[] = [filterTrue];
                  link = '/admin/user?filters=' + JSON.stringify(filterAccounts);
                  name = 'User Accounts';
                  count = await this.service.count(table.Name, filterAccounts).then((result: ResultApi) => {
                    return result && result.Type == ResultType.Success ? parseInt(result.Object) : 0;
                  });
                  let itemAccount: DashboardItemDto = {
                    Name: name,
                    Link: link,
                    Count: count,
                    Icon: UtilityHelper.randomItem(ConstantHelper.ICONS),
                    IconColor: UtilityHelper.randomItem(ConstantHelper.COLORS)
                  };
                  this.items.push(itemAccount);

                  // account awaiting
                  let filterNull = {
                    value: null,
                    name: 'Approved',
                    type: FilterType.Or,
                    compare: CompareType.B_Equals,
                  };
                  let filterFalse = {
                    value: false,
                    name: 'Approved',
                    type: FilterType.Or,
                    compare: CompareType.B_Equals,
                  };
                  let filterAccountAwaitings: FilterData[] = [filterNull, filterFalse];
                  link = '/admin/user?filters=' + JSON.stringify(filterAccountAwaitings);
                  name = 'Account Awaiting Approval';
                  count = await this.service.count(table.Name, filterAccountAwaitings).then((result: ResultApi) => {
                    return result && result.Type == ResultType.Success ? parseInt(result.Object) : 0;
                  });
                  let itemAccountAwaiting = {
                    Name: name,
                    Link: link,
                    Count: count,
                    Icon: UtilityHelper.randomItem(ConstantHelper.ICONS),
                    IconColor: UtilityHelper.randomItem(ConstantHelper.COLORS)
                  };
                  this.items.push(itemAccountAwaiting);
                }
                  break;
                case 'company': {
                  link = '/admin/company';
                  name = 'Companies';
                }
                  break;
                case 'market': {
                  link = '/admin/market';
                  name = 'Market Place';
                }
                  break;
                case 'tutorial': {
                  link = '/admin/tutorial';
                  name = 'Tutorials';
                }
                  break;
                case 'ticket': {
                  link = '/admin/ticket';
                  name = 'Support Tickets';
                }
                  break;
                case 'licence': {
                  link = '/admin/licence';
                  name = 'Licences';
                }
                  break;
                case 'feedback': {
                  link = '/admin/feedback';
                  name = 'Feedback';
                }
                  break;
              }
              if (table.Name.toLowerCase() != 'user' && (name || link)) {
                let item: DashboardItemDto = {
                  Name: name,
                  Link: link,
                  Count: count,
                  Icon: UtilityHelper.randomItem(ConstantHelper.ICONS),
                  IconColor: UtilityHelper.randomItem(ConstantHelper.COLORS)
                };
                this.items.push(item);
              }
            });
            this.loading = false;
          }
        }
      }).catch(() => {
        this.loading = false;
      });
    }
  }

  navigate(item: DashboardItemDto) {
    RouterHelper.Navigate(this.router, item.Link.toLowerCase());
  }
}
