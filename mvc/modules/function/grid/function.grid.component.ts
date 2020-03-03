import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { MvcDataService } from "../../../../mvc/services/data.service";
import { FunctionEntity } from "../../../../mvc/domains/entities/function.entity";
import { GridBaseComponent } from "../../../components/grid/base/grid.base.component";

@Component({
  selector: 'app-function-edit',
  templateUrl: '../../../components/grid/base/grid.base.component.html',
})
export class FunctionGridComponent extends GridBaseComponent {
  constructor(public data: MvcDataService, public router: Router) {
    super(FunctionEntity, router, data);
  }
}