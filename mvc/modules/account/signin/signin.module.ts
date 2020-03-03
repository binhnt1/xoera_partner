
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MvcSharedModule } from '../../shared.module';
import { AccountSignInComponent } from './signin.component';

@NgModule({
    declarations: [
        AccountSignInComponent
    ],
    imports: [
        MvcSharedModule,
        RouterModule.forChild([           
            { path: '', component: AccountSignInComponent, pathMatch: 'full' },
        ])
    ]
})
export class AccountSignInModule { }
