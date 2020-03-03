import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { ClientLoginEntity } from "../../../../domains/entities/client.login.entity";

@Component({
  selector: 'app-client-login-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class ClientLoginGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(ClientLoginEntity, router, data)
  }
}
