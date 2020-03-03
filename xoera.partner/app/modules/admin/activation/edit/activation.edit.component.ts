import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { ActivationEntity } from "../../../../domains/entities/activation.entity";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";

@Component({
  selector: 'app-activation-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class ActivationEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(ActivationEntity, router, data, event);
  }
}
