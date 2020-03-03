
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebsiteGridComponent } from './grid/website.grid.component';
import { WebsiteEditComponent } from './edit/website.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        WebsiteGridComponent,
        WebsiteEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: WebsiteGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: WebsiteGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: WebsiteEditComponent },
                    { path: 'edit', component: WebsiteEditComponent },
                ]
            }
        ])
    ]
})
export class WebsiteModule { }
