import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { XoeraPartnerBookingItemComponent } from './component/booking.item.component';

@NgModule({
  declarations: [
    BookingComponent,
    XoeraPartnerBookingItemComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: BookingComponent, pathMatch: 'full' }
    ])
  ]
})
export class BookingModule { }
