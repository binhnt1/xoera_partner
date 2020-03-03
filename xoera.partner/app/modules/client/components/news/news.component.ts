import { Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { OrderType } from "../../../../../../mvc/domains/enums/order.type";
import { ResultType } from "../../../../../../mvc/domains/enums/result.type";
import { SortingData } from "../../../../../../mvc/domains/data/sorting.data";
import { NewsEntity } from "../../../../domains/entities/news.entity";

@Component({
    styleUrls: ['./news.scss'],
    templateUrl: './news.component.html',
    selector: 'xoera-partner-news-component',
})
export class XoeraPartnerNewsComponent implements OnInit {
    items: NewsEntity[];
    @Input() amount: number;

    constructor(
        public router: Router,
        public serive: ApiService) {
    }

    ngOnInit() {
        if (!this.amount) this.amount = 5;
        let orders: SortingData[] = [{
            name: 'DateTime',
            type: OrderType.Desc,
        }];
        this.serive.selectTop('News', null, null, orders, this.amount).then((result: ResultApi) => {
            if (result && result.Type == ResultType.Success) {
                this.items = <NewsEntity[]>result.Object;
            }
        });
    }

    public navigate(item: NewsEntity) {
        if (item) {
            let url = '/newsdetail';
            RouterHelper.Navigate(this.router, url, {
                id: item.Id
            });
        }
    }
}
