
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XoeraPartnerModule } from '../../xoera.partner.module';
import { TutorialCategoryGridComponent } from './grid/tutorial.category.grid.component';
import { TutorialCategoryEditComponent } from './edit/tutorial.category.edit.component';
import { TemplateGridComponent } from '../../../../../mvc/templates/grid/template.grid.component';
import { TemplateEditComponent } from '../../../../../mvc/templates/edit/template.edit.component';

@NgModule({
    declarations: [
        TutorialCategoryGridComponent,
        TutorialCategoryEditComponent
    ],
    imports: [
        XoeraPartnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: TemplateGridComponent,
                children: [
                    { path: '', component: TutorialCategoryGridComponent, pathMatch: 'full' },
                    { path: 'grid', component: TutorialCategoryGridComponent },
                ]
            },
            {
                path: '',
                component: TemplateEditComponent,
                children: [
                    { path: 'new', component: TutorialCategoryEditComponent },
                    { path: 'edit', component: TutorialCategoryEditComponent },
                ]
            }
        ])
    ]
})
export class TutorialCategoryModule { }
