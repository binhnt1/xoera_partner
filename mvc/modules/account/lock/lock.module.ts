import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MvcSharedModule } from '../../shared.module';
import { AccountLockComponent } from './lock.component';

@NgModule({
    declarations: [
        AccountLockComponent
    ],
    imports: [
        MvcSharedModule,
        RouterModule.forChild([           
            { path: '', component: AccountLockComponent, pathMatch: 'full' },
        ])
    ]
})
export class AccountLockModule { }
