
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserGridComponent } from './grid/user.grid.component';
import { UserEditComponent } from './edit/user.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        UserGridComponent,
        UserEditComponent,
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: UserGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: UserGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: UserEditComponent },
                    { path: 'edit', component: UserEditComponent },
                ]
            }
        ])
    ]
})
export class UserModule { }
