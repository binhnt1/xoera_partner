import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { FeedbackEntity } from "../../../../domains/entities/feedback.entity";

@Component({
  selector: 'app-feedback-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class FeedbackGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(FeedbackEntity, router, data)
  }
}
