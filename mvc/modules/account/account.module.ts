import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MvcSharedModule } from '../shared.module';
import { AccountGridComponent } from './grid/account.grid.component';
import { AccountEditComponent } from './edit/account.edit.component';
import { TemplateGridComponent } from '../../templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../templates/edit/template.edit.component';


@NgModule({
    declarations: [
        AccountGridComponent,
        AccountEditComponent,
    ],
    imports: [
        MvcSharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: AccountGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: AccountGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: AccountEditComponent },
                    { path: 'edit', component: AccountEditComponent },
                ]
            }
        ])
    ]
})
export class AccountModule { }
