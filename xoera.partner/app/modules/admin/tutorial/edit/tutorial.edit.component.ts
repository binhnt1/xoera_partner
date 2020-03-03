import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { TutorialEntity } from "../../../../domains/entities/tutorial.entity";

@Component({
  selector: 'app-tutorial-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class TutorialEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(TutorialEntity, router, data, event);
  }
}
