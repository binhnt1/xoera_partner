import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { DataService } from "../../../services/data.service";
import { RouterHelper } from "../../../../../mvc/helpers/router.helper";
import { ResultApi } from "../../../../../mvc/domains/data/result.api";
import { ResultType } from "../../../../../mvc/domains/enums/result.type";
import { MenuPageEntity } from "../../../domains/entities/menu.page.entity";

@Component({
  styleUrls: ['./pages.scss'],
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  loading: boolean;
  item: MenuPageEntity;

  constructor(
    public router: Router,
    public data: DataService,
    public service: ApiService) {
    this.loading = true;
    let link = RouterHelper.GetController(this.router);
    this.service.menupage(link).then((result: ResultApi) => {
      if (result.Type == ResultType.Success && result.Object) {
        this.item = <MenuPageEntity>result.Object;
        this.loading = false;
      } else {
        this.router.navigateByUrl('/error/404');
      }
    })
  }
}
