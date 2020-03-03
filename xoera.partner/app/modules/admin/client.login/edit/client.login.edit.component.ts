import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { ClientLoginEntity } from "../../../../domains/entities/client.login.entity";

@Component({
  selector: 'app-client-login-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class ClientLoginEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(ClientLoginEntity, router, data, event);
  }
}
