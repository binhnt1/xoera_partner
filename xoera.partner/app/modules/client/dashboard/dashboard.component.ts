import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { DialogType } from "../../../domains/enums/dialog.type";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { AgreementEntity } from "../../../domains/entities/agreement.entity";
import { MvcDialogService } from "../../../../../mvc/services/dialog.service";
import { UserAgreementEntity } from "../../../domains/entities/user.agreement.entity";

@Component({
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    public router: Router,
    public auth: AuthService,
    public serive: ApiService,
    public dialog: MvcDialogService) {
    let account = this.auth.account;
    if (account) {
      this.serive.getAgreement(account.Id).then((result: ResultApi) => {
        if (result && result.Type == ResultType.Success && result.Object) {
          let item = <AgreementEntity>result.Object;
          this.dialog.Dialog({
            title: item.Name,
            content: item.Text,
            type: <number>DialogType.Agreement,
            okFunction: () => {
              let entity: UserAgreementEntity = {
                Agreed: true,
                UserId: account.Id,
                AgreedOn: new Date(),
                AgreementId: item.Id,
              };
              this.serive.acceptAgreement(entity).then((acceptResult: ResultApi) => {
                if (!acceptResult || acceptResult.Type != ResultType.Success) {
                  RouterHelper.Navigate(this.router, '/agreement', {
                    account: account.UserName || account.Phone || account.Email,
                  }, true);
                }
              });
            },
            cancelFunction: () => {
              RouterHelper.Navigate(this.router, '/agreement', {
                account: account.UserName || account.Phone || account.Email,
              }, true);
            }
          });
        }
      });
    }
  }
}
