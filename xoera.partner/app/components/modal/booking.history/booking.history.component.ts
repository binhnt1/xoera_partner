import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingDto } from '../../../domains/objects/booking.dto';
import { RememberType } from '../../../domains/enums/remeber.type';
import { BookingHistory } from '../../../domains/data/booking.history';
import { MvcApiService } from '../../../../../mvc/services/api.service';
import { DialogData } from '../../../../../mvc/domains/data/dialog.data';
import { MvcDataService } from '../../../../../mvc/services/data.service';
import { ApiBookingService } from '../../../services/api.booking.service';
import { MvcEventService } from '../../../../../mvc/services/event.service';
import { MvcDialogService } from '../../../../../mvc/services/dialog.service';
import { DialogTypeAware, DialogType } from '../../../domains/enums/dialog.type';
import { BookingHistoryEditDto } from '../../../domains/objects/booking.history.edit.dto';

@DialogTypeAware
@Component({
    templateUrl: 'booking.history.component.html',
    selector: 'xoera-partner-modal-booking-history',
    styleUrls: ['../modal.scss', './booking.history.scss'],
})

export class XoeraPartnerModalBookingHistoryComponent implements OnInit, OnDestroy {
    loading: boolean;
    bookingId: number;
    dialog: DialogData;
    visible: boolean = false;
    itemDto: BookingHistoryEditDto;
    eventDialog: Subscription = null;
    bookingHistories: BookingHistory[];
    requestBookingHistory: Subscription;

    processing: boolean;
    processingEditBooking: boolean;
    processingBookSimilar: boolean;
    processingBookSimilarNF: boolean;
    processingEditBookingNF: boolean;

    constructor(
        public data: MvcDataService,
        public event: MvcEventService,
        public service: MvcApiService,
        public dialogService: MvcDialogService,
        public serviceBooking: ApiBookingService) {
        this.itemDto = new BookingHistoryEditDto();
    }

    ngOnInit() {
        if (this.eventDialog == null) {
            this.eventDialog = this.dialogService.EventDialog.subscribe((item: DialogData) => {
                if (item.type == <number>DialogType.BookingHistory) {
                    this.dialog = item;
                    this.visible = true;
                    if (this.dialog.object) {
                        let obj = <BookingDto>this.dialog.object;
                        this.itemDto.Name = obj.CallerName;
                        this.itemDto.Rating = obj.CallerRating || 4;
                    }
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.eventDialog != null) {
            this.eventDialog.unsubscribe();
            this.eventDialog = null;
        }
    }

    closeModal() {
        if (this.dialog) {
            if (this.dialog.cancelFunction) {
                this.dialog.cancelFunction();
            }
            this.dialog = null;
            this.visible = false;
        }
    }

    newBooking() {
        if (this.dialog) {
            let bookingNew: BookingDto = new BookingDto();
            if (this.dialog.okFunction) {
                this.dialog.okFunction(bookingNew);
            }
            this.dialog = null;
            this.visible = false;
        }
    }
    newBookingNF() {
        if (this.dialog) {
            let bookingNew: BookingDto = new BookingDto();
            if (this.dialog.resultFunction) {
                this.dialog.resultFunction(bookingNew);
            }
            this.dialog = null;
            this.visible = false;
        }
    }
    cancelBooking() {

    }
    async bookSimilar() {
        if (this.dialog) {
            this.processing = true;
            this.processingBookSimilar = true;
            let booking = await this.requestBookingDetailApi();
            if (booking) {
                let bookingNew: BookingDto = new BookingDto();
                if (this.itemDto.Remember == RememberType.Normal) {
                    bookingNew.PickUp = _.cloneDeep(booking.PickUp);
                    bookingNew.PickDown = _.cloneDeep(booking.PickDown);
                } else {
                    bookingNew.PickUp = _.cloneDeep(booking.PickDown);
                    bookingNew.PickDown = _.cloneDeep(booking.PickUp);
                }
                if (this.dialog.okFunction) {
                    this.dialog.okFunction(bookingNew);
                }
                this.dialog = null;
                this.visible = false;
            }
            this.processing = false;
            this.processingBookSimilar = false;
        }
    }
    async editBooking() {
        if (this.dialog) {
            this.processing = true;
            this.processingEditBooking = true;
            let booking = await this.requestBookingDetailApi();
            if (booking) {
                if (this.dialog.okFunction) {
                    this.dialog.okFunction(booking);
                }
                this.dialog = null;
                this.visible = false;
            }
            this.processing = false;
            this.processingEditBooking = false;
        }
    }
    async bookSimilarNF() {
        if (this.dialog) {
            this.processing = true;
            this.processingBookSimilarNF = true;
            let booking = await this.requestBookingDetailApi();
            if (booking) {
                let bookingNew: BookingDto = new BookingDto();
                if (this.itemDto.Remember == RememberType.Normal) {
                    bookingNew.PickUp = _.cloneDeep(booking.PickUp);
                    bookingNew.PickDown = _.cloneDeep(booking.PickDown);
                } else {
                    bookingNew.PickUp = _.cloneDeep(booking.PickDown);
                    bookingNew.PickDown = _.cloneDeep(booking.PickUp);
                }
                if (this.dialog.resultFunction) {
                    this.dialog.resultFunction(bookingNew);
                }
                this.dialog = null;
                this.visible = false;
            }
            this.processing = false;
            this.processingBookSimilarNF = false;
        }
    }
    async editBookingNF() {
        if (this.dialog) {
            this.processing = true;
            this.processingEditBookingNF = true;
            let booking = await this.requestBookingDetailApi();
            if (booking) {
                if (this.dialog.resultFunction) {
                    this.dialog.resultFunction(booking);
                }
                this.dialog = null;
                this.visible = false;
            }
            this.processing = false;
            this.processingEditBookingNF = false;
        }
    }

    filterChanged() {
        this.requestBookingHistoryApi();
    }
    bookingSelected(id: number) {
        this.bookingId = id;
    }

    requestBookingHistoryApi() {
        if (this.dialog.content) {
            this.loading = true;
            if (this.requestBookingHistory) {
                this.requestBookingHistory.unsubscribe();
            }
            let code = (<string>this.dialog.content).split('/')[0],
                phoneNumber = (<string>this.dialog.content).split('/')[1];
            this.requestBookingHistory = this.serviceBooking.bookingHistoryByCustomer(code, phoneNumber, this.itemDto.History).subscribe((items: BookingHistory[]) => {
                this.bookingHistories = items;
                if (this.bookingHistories) {
                    this.bookingHistories.forEach((item: BookingHistory) => {
                        if (item.bookingDateTime)
                            item.dateTime = new Date(item.bookingDateTime);
                    });
                }
                this.loading = false;
            });
        }
    }

    async requestBookingDetailApi() {
        return await this.serviceBooking.bookingDetail(this.bookingId).then((item: BookingDto) => {
            return item;
        });
    }
}
