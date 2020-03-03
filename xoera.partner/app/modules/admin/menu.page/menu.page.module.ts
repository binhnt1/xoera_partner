
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuPageGridComponent } from './grid/menu.page.grid.component';
import { MenuPageEditComponent } from './edit/menu.page.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';
@NgModule({
    declarations: [
        MenuPageGridComponent,
        MenuPageEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: MenuPageGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: MenuPageGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: MenuPageEditComponent },
                    { path: 'edit', component: MenuPageEditComponent },
                ]
            }
        ])
    ]
})
export class MenuPageModule { }
