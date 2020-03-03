
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { XoeraPartnerLicenceDetailComponent } from './licence.detail.component';

@NgModule({
  declarations: [
    XoeraPartnerLicenceDetailComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: XoeraPartnerLicenceDetailComponent, pathMatch: 'full' }
    ])
  ]
})
export class LicenceDetailModule { }
