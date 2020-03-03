
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        ForgotComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: ForgotComponent, pathMatch: 'full' },
        ])
    ]
})
export class ForgotModule { }
