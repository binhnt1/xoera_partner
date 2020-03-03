import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { AppConfig } from "../../../../../mvc/helpers/app.config";
import { NewsEntity } from "../../../domains/entities/news.entity";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { MvcDialogService } from "../../../../../mvc/services/dialog.service";

@Component({
    styleUrls: ['./news.detail.scss'],
    templateUrl: './news.detail.component.html',
})
export class XoeraPartnerNewsDetailComponent {
    item: NewsEntity;

    constructor(
        public router: Router,
        public auth: AuthService,
        public serive: ApiService,
        public dialog: MvcDialogService) {
        let id = RouterHelper.getId(this.router);
        this.serive.selectOne('News', id).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                this.item = <NewsEntity>result.Object;
            }
        });
    }
}
