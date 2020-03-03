import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LockComponent } from './lock.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';

@NgModule({
    declarations: [
        LockComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([           
            { path: '', component: LockComponent, pathMatch: 'full' },
        ])
    ]
})
export class LockModule { }
