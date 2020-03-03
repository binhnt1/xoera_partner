declare var toastr: any;
import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { AppConfig } from "../../../../../mvc/helpers/app.config";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { MvcAuthService } from "../../../../../mvc/services/auth.service";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { FilterData } from "../../../../../mvc/domains/data/filter.data";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { CompareType } from "../../../../../mvc/domains/enums/compare.type";
import { CompanyEntity } from "../../../domains/entities/company.entity";
import { CompanyPartnerDto } from "../../../domains/objects/company.partner.dto";
import { CompanyPartnerEntity } from "../../../domains/entities/company.partner";

@Component({
    styleUrls: ['./company.partner.scss'],
    templateUrl: './company.partner.component.html',
})
export class CompanyPartnerComponent {
    admin: boolean;
    message: string;
    loading: boolean;
    processing: boolean;
    loadingText: string;
    item: CompanyPartnerDto;
    companies: CompanyEntity[];
    companyPartnerChoices: number[];
    companyPartners: CompanyEntity[];
    companyAvaiableChoices: number[];
    companyAvaiables: CompanyEntity[];
    disableAddPartner: boolean = true;
    disableRemovePartner: boolean = true;

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService,
        public mvcAuth: MvcAuthService) {
        this.loading = true;
        this.item = new CompanyPartnerDto();
        this.serive.selectAll('Company', ["Id", "Name"], null, null, 1, 1000).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                this.companyPartners = [];
                this.companies = <CompanyEntity[]>result.Object;
                let companyAvaiables = _.cloneDeep(this.companies) || [];
                this.companyAvaiables = _.orderBy(companyAvaiables, c => c.Name);
            }
            this.loading = false;
        });
        let adminController = RouterHelper.GetController(this.router) == 'admin';
        this.admin = adminController && this.mvcAuth.account != null;
        if (!this.admin && this.auth.account) {
            this.item.CompanyId = this.auth.account.CompanyId;
            this.companyChanged();
        }
    }

    public async addPartner() {
        if (this.item && this.item.CompanyId &&
            this.companyAvaiableChoices && this.companyAvaiableChoices.length > 0) {
            this.loading = true;
            let success: boolean = false;
            for (let i = 0; i < this.companyAvaiableChoices.length; i++) {
                let entity: CompanyPartnerEntity = {
                    Accept: false,
                    CompanyId: this.item.CompanyId,
                    PartnerId: this.companyAvaiableChoices[i],
                };
                entity.Id = await this.serive.insert('CompanyPartner', entity).then((result: ResultApi) => {
                    if (result && result.Type == ResultType.Success)
                        return <number>result.Object;
                });
                if (entity.Id) success = true;
            }
            if (success) {
                await this.companyChanged();
                this.companyPartnerChoices = [];
                this.companyAvaiableChoices = [];
                this.changeCompanyPartnerChoices();
                this.changeCompanyAvaiableChoices();
                toastr.success('add partner success', 'Information');
            }
            this.loading = false;
        }
    }

    public async removePartner() {
        if (this.item && this.item.CompanyId &&
            this.companyPartnerChoices && this.companyPartnerChoices.length > 0) {
            this.loading = true;
            let filters: FilterData[] = [
                { name: 'CompanyId', compare: CompareType.N_Equals, value: this.item.CompanyId },
                { name: 'PartnerId', compare: CompareType.N_Contains, value: this.companyPartnerChoices },
            ];
            this.serive.selectAll('CompanyPartner', null, filters, null, 1, 1000).then(async (result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    let parters = <CompanyPartnerEntity[]>result.Object,
                        companyParterIds = _.cloneDeep(parters.map(c => c.Id)),
                        deleted = await this.serive.delete('CompanyPartner', companyParterIds).then((result: ResultApi) => {
                            if (result && result.Type == ResultType.Success)
                                return <boolean>result.Object;
                            return false;
                        });
                    if (deleted) {
                        await this.companyChanged();
                        this.companyPartnerChoices = [];
                        this.companyAvaiableChoices = [];
                        this.changeCompanyPartnerChoices();
                        this.changeCompanyAvaiableChoices();
                        toastr.success('Remove partner success', 'Information');
                    }
                }
            });            
            this.loading = false;
        }
    }

    public async companyChanged() {
        let companyId = parseInt(this.item.CompanyId.toString());
        if (companyId) {
            this.loading = true;
            await this.serive.selectOne('Company', companyId).then(async (result: ResultApi) => {
                if (result && result.Type == ResultType.Success) {
                    this.item.Company = <CompanyEntity>result.Object;

                    let filters: FilterData[] = [{ name: 'CompanyId', compare: CompareType.N_Equals, value: companyId }];
                    let partners = await this.serive.selectAll('CompanyPartner', null, filters, null, 1, 1000).then((result: ResultApi) => {
                        if (result && result.Type == ResultType.Success) {
                            return <CompanyPartnerEntity[]>result.Object;
                        }
                        return null;
                    });
                    if (partners && partners.length > 0) {
                        let partnerIds = partners.map(c => c.PartnerId) || [],
                            partnerAllIds = _.cloneDeep(partnerIds); partnerAllIds.push(companyId);
                        let companyPartners = _.cloneDeep(this.companies.filter(c => partnerIds.indexOf(c.Id) >= 0)) || [],
                            companyAvaiables = _.cloneDeep(this.companies.filter(c => partnerAllIds.indexOf(c.Id) == -1)) || [];
                        this.companyPartners = _.orderBy(companyPartners, c => c.Name);
                        this.companyAvaiables = _.orderBy(companyAvaiables, c => c.Name);

                    } else {
                        let companyAvaiables = _.cloneDeep(this.companies.filter(c => c.Id != companyId));
                        this.companyAvaiables = _.orderBy(companyAvaiables, c => c.Name);
                        this.companyPartners = [];
                    }
                }
                this.loading = false;
            });
        } else {
            this.item.CompanyId = 0;
            this.item.Company = null;
            this.companyPartners = [];
            this.companyPartnerChoices = [];
            this.companyAvaiableChoices = [];
            let companyAvaiables = _.cloneDeep(this.companies) || [];
            this.companyAvaiables = _.orderBy(companyAvaiables, c => c.Name);
        }
        this.changeCompanyPartnerChoices();
        this.changeCompanyAvaiableChoices();
    }

    public changeCompanyPartnerChoices() {
        this.disableRemovePartner = !this.item || !this.item.CompanyId ||
            !this.companyPartnerChoices || this.companyPartnerChoices.length == 0;
    }

    public changeCompanyAvaiableChoices() {
        this.disableAddPartner = !this.item || !this.item.CompanyId ||
            !this.companyAvaiableChoices || this.companyAvaiableChoices.length == 0;
    }
}
