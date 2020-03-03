
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent, pathMatch: 'full' }
    ])
  ]
})
export class ProfileModule { }
