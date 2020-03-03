
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { CompanyPartnerComponent } from './company.partner.component';

@NgModule({
  declarations: [
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: CompanyPartnerComponent, pathMatch: 'full' }
    ])
  ]
})
export class CompanyPartnerModule { }
