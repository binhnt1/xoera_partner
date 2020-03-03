import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { TutorialEntity } from "../../../../domains/entities/tutorial.entity";

@Component({
  selector: 'app-tutorial-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class TutorialGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(TutorialEntity, router, data)
  }
}
