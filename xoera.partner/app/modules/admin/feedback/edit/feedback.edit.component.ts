import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { FeedbackEntity } from "../../../../domains/entities/feedback.entity";

@Component({
  selector: 'app-feedback-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class FeedbackEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(FeedbackEntity, router, data, event);
  }
}
