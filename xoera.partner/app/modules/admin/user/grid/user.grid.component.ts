import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { UserEntity } from "../../../../domains/entities/user.entity";

@Component({
  selector: 'app-user-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class UserGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(UserEntity, router, data)
  }
}
