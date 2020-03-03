import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { AppConfig } from "../../../../../mvc/helpers/app.config";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { LicenceEntity } from "../../../domains/entities/licence.entity";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { MvcDialogService } from "../../../../../mvc/services/dialog.service";

@Component({
    styleUrls: ['./licence.detail.scss'],
    templateUrl: './licence.detail.component.html',
})
export class XoeraPartnerLicenceDetailComponent {
    item: LicenceEntity;

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService,
        public dialog: MvcDialogService) {
        let id = RouterHelper.getId(this.router);
        this.serive.selectOne('Licence', id).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                this.item = <LicenceEntity>result.Object;
            }
        });
    }
}
