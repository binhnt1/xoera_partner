
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsGridComponent } from './grid/news.grid.component';
import { NewsEditComponent } from './edit/news.edit.component';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';
@NgModule({
    declarations: [
        NewsGridComponent,
        NewsEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: NewsGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: NewsGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: NewsEditComponent },
                    { path: 'edit', component: NewsEditComponent },
                ]
            }
        ])
    ]
})
export class NewsModule { }
