import { Router } from "@angular/router";
import { Component, Input, OnChanges } from "@angular/core";
import { Dictionary } from "../../../domains/data/dictionary";
import { PagingData } from "../../../domains/data/paging.data";
import { MvcDataService } from "../../../services/data.service";

@Component({
    selector: 'grid-paging',
    styleUrls: ['./paging.scss'],
    templateUrl: './paging.component.html',
})
export class GridPagingComponent implements OnChanges {
    to: number;
    from: number;
    size: number = 20;
    numbers: number[];
    sizes: Dictionary[];
    @Input() paging: PagingData;

    constructor(
        public router: Router,
        public data: MvcDataService) {
        this.sizes = [
            { key: 10, value: 10 },
            { key: 20, value: 20 },
            { key: 50, value: 50 },
            { key: 100, value: 100 },
            { key: 150, value: 150 },
            { key: 200, value: 200 },
        ];

        // render editor
        let interval = setInterval(() => {
            let $element = <any>jQuery('#page_size_select');
            if ($element && $element.length > 0) {
                $element.selectpicker({
                    iconBase: 'fa',
                    tickIcon: 'fa-check'
                }).on('changed.bs.select', (e: any, clickedIndex: number) => {
                    this.size = this.sizes[clickedIndex].key;
                    this.data.paging(null, this.size);
                });
                clearInterval(interval);
            }
        }, 100);
    }

    ngOnChanges() {
        this.initPaging();
    }

    private initPaging() {
        this.numbers = [];
        this.to = this.paging.index * this.paging.size;
        if (this.paging.total < this.to) {
            this.to = this.paging.total;
        }
        this.from = this.to == 0 ? 0 : ((this.paging.index - 1) * this.paging.size) + 1;

        var startIndex = this.paging.index - 3;
        if (startIndex <= 1) {
            startIndex = 1;
        }
        var endIndex = this.paging.index + 1;
        if (endIndex <= 5) {
            endIndex = this.paging.pages > 5 ? 5 : this.paging.pages;
        }
        else if (endIndex > this.paging.pages) {
            endIndex = this.paging.pages;
        }
        for (var i = startIndex; i <= endIndex; i++) {
            this.numbers.push(i);
        }
    }

    public navigate(index?: number, size?: number) {
        this.data.paging(index, size);
    }
}
