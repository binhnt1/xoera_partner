
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { ClientLoginGridComponent } from './grid/client.login.grid.component';
import { ClientLoginEditComponent } from './edit/client.login.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        ClientLoginGridComponent,
        ClientLoginEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: ClientLoginGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: ClientLoginGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: ClientLoginEditComponent },
                    { path: 'edit', component: ClientLoginEditComponent },
                ]
            }
        ])
    ]
})
export class ClientLoginModule { }
