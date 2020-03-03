import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { ResultType } from "../../../../../../mvc/domains/enums/result.type";
import { CompanyEntity } from "../../../../domains/entities/company.entity";

@Component({
    styleUrls: ['./company.scss'],
    templateUrl: './company.component.html',
    selector: 'xoera-partner-company-component',
})
export class XoeraPartnerCompanyComponent {
    item: CompanyEntity;

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService) {
        let account = this.auth.account;
        if (account) {
            this.serive.selectOne('Company', account.CompanyId).then((result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.item = <CompanyEntity>result.Object;
                }
            });
        }
    }
}
