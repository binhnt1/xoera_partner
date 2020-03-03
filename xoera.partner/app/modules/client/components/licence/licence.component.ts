import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { FilterData } from "../../../../../../mvc/domains/data/filter.data";
import { ResultType } from "../../../../../../mvc/domains/enums/result.type";
import { CompareType } from "../../../../../../mvc/domains/enums/compare.type";
import { LicenceEntity } from "../../../../domains/entities/licence.entity";

@Component({
    styleUrls: ['./licence.scss'],
    templateUrl: './licence.component.html',
    selector: 'xoera-partner-licence-component',
})
export class XoeraPartnerLicenceComponent {
    items: LicenceEntity[];

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService) {
        let account = this.auth.account;
        if (account) {
            let filters: FilterData[] = [{
                name: 'CompanyId', compare: CompareType.N_Equals, value: account.CompanyId
            }];
            this.serive.selectAll('Licence', null, filters, null, 1, 5).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.items = <LicenceEntity[]>result.Object;
                }
            });
        }
    }

    public navigate(item: LicenceEntity) {
        if (item) {
            let url = '/licencedetail';
            RouterHelper.Navigate(this.router, url, {
                id: item.Id
            });
        }
    }
}
