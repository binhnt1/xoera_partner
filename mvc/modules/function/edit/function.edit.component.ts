import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { MvcDataService } from "../../../../mvc/services/data.service";
import { MvcEventService } from "../../../../mvc/services/event.service";
import { FunctionEntity } from "../../../../mvc/domains/entities/function.entity";
import { EditBaseComponent } from "../../../components/edit/base/edit.base.component";

@Component({
  selector: 'app-function-edit',
  templateUrl: '../../../components/edit/base/edit.base.component.html',
})
export class FunctionEditComponent extends EditBaseComponent {
  constructor(public data: MvcDataService, public event: MvcEventService, public router: Router) {
    super(FunctionEntity, router, data, event);
  }
}
