import { Component } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { BookingDto } from "../../../domains/objects/booking.dto";
import { SearchAddressType } from "../../../domains/enums/search.address.type";

@Component({
    selector: 'app-booking',
    styleUrls: ['./booking.scss'],
    templateUrl: './booking.component.html',
})
export class BookingComponent {
    items: BookingDto[] = [];
    selectedItem: BookingDto;

    constructor(public data: DataService) {
        this.data.SearchAddressType = SearchAddressType.Local;
        this.items.push(new BookingDto());
        this.selectedItem = this.items[0];
    }

    addItem(item: BookingDto) {
        if (item) {
            this.items.push(item);
            this.selectedItem = item;
        }
    }

    selectItem(item: BookingDto) {
        this.selectedItem = item;
    }
}
