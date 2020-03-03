import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MvcSharedModule } from '../../shared.module';
import { AccountForgotComponent } from './forgot.component';

@NgModule({
    declarations: [
        AccountForgotComponent
    ],
    imports: [
        MvcSharedModule,
        RouterModule.forChild([           
            { path: '', component: AccountForgotComponent, pathMatch: 'full' },
        ])
    ]
})
export class AccountForgotModule { }
