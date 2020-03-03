
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TutorialComponent } from './tutorial.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
  declarations: [
    TutorialComponent,
  ],
  imports: [
    XoeraPartnerModule,
    RouterModule.forChild([
      { path: '', component: TutorialComponent, pathMatch: 'full' }
    ])
  ]
})
export class TutorialModule { }
