
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LicenceComponent } from './licence.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
  declarations: [
    LicenceComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: LicenceComponent, pathMatch: 'full' }
    ])
  ]
})
export class LicenceModule { }
