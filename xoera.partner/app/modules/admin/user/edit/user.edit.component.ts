import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { UserEntity } from "../../../../domains/entities/user.entity";

@Component({
  selector: 'app-user-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class UserEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(UserEntity, router, data, event);
  }
}
