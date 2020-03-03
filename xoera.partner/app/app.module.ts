import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AuthGuard } from "../../mvc/guards/auth.guard";
import { MvcApiService } from "../../mvc/services/api.service";
import { MvcDataService } from "../../mvc/services/data.service";
import { MvcAuthService } from "../../mvc/services/auth.service";
import { MvcEventService } from "../../mvc/services/event.service";
import { MvcDialogService } from "../../mvc/services/dialog.service";
import { XoeraPartnerLayoutSignInComponent } from "./layout/signin/layout.signin.component";
import { TemplateSignInComponent } from "../../mvc/templates/signin/template.signin.component";
import { LayoutMetronicSassComponent } from "../../mvc/layout/metronic-sass/metronic.component";

import { ApiService } from "./services/api.service";
import { DataService } from "./services/data.service";
import { AuthService } from "./services/auth.service";
import { UtilService } from "./services/util.service";
import { GridModule } from '@progress/kendo-angular-grid';
import { XoeraPartnerAuthGuard } from "./guards/auth.guard";
import { XoeraPartnerModule } from "./modules/xoera.partner.module";
import { XoeraPartnerLayoutComponent } from "./layout/layout.component";
import { ApiBookingService } from "./services/api.booking.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LayoutMetronicSassComponent,
    XoeraPartnerLayoutComponent,
    XoeraPartnerLayoutSignInComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    XoeraPartnerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: '', loadChildren: './modules/client/dashboard/dashboard.module#DashboardModule', canActivate: [XoeraPartnerAuthGuard] },
          { path: 'dashboard', loadChildren: './modules/client/dashboard/dashboard.module#DashboardModule', canActivate: [XoeraPartnerAuthGuard] },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'lock', loadChildren: './modules/user/lock/lock.module#LockModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'signin', loadChildren: './modules/user/signin/signin.module#SignInModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'signup', loadChildren: './modules/user/signup/signup.module#SignUpModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'forgot', loadChildren: './modules/user/forgot/forgot.module#ForgotModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'vertify', loadChildren: './modules/user/vertify/vertify.module#VertifyModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'approved', loadChildren: './modules/user/approved/approved.module#ApprovedModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutSignInComponent,
        children: [
          { path: 'agreement', loadChildren: './modules/user/agreement/agreement.module#AgreementModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'company', loadChildren: './modules/client/profile/profile.module#ProfileModule' },
          { path: 'profile', loadChildren: './modules/client/profile/profile.module#ProfileModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'newsdetail', loadChildren: './modules/client/news.detail/news.detail.module#NewsDetailModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'licence', loadChildren: './modules/client/licence/licence.module#LicenceModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'licencedetail', loadChildren: './modules/client/licence.detail/licence.detail.module#LicenceDetailModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'tutorial', loadChildren: './modules/client/tutorial/tutorial.module#TutorialModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'ticket', loadChildren: './modules/client/ticket/ticket.module#TicketModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'companypartner', loadChildren: './modules/client/company.partner/company.partner.module#CompanyPartnerModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: 'error', loadChildren: './modules/client/error/error.module#ErrorModule' }
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin', loadChildren: './modules/admin/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
          { path: 'admin/dashboard', loadChildren: './modules/admin/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/booking', loadChildren: './modules/admin/booking/booking.module#BookingModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/error', loadChildren: '../../mvc/modules/error/error.module#ErrorModule' },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/activation', loadChildren: './modules/admin/activation/activation.module#ActivationModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/agreement', loadChildren: './modules/admin/agreement/agreement.module#AgreementModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/useragreement', loadChildren: './modules/admin/user.agreement/user.agreement.module#UserAgreementModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/bookingenginelicence', loadChildren: './modules/admin/booking.engine.licence/booking.engine.licence.module#BookingEngineLicenceModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/menupage', loadChildren: './modules/admin/menu.page/menu.page.module#MenuPageModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/bookingparameters', loadChildren: './modules/admin/booking.parameters/booking.parameters.module#BookingParametersModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/clientlogin', loadChildren: './modules/admin/client.login/client.login.module#ClientLoginModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/company', loadChildren: './modules/admin/company/company.module#CompanyModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/licence', loadChildren: './modules/admin/licence/licence.module#LicenceModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/news', loadChildren: './modules/admin/news/news.module#NewsModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/smtpaccount', loadChildren: './modules/admin/smtp.account/smtp.account.module#SmtpAccountModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/templateemail', loadChildren: './modules/admin/template.email/template.email.module#TemplateEmailModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/feedback', loadChildren: './modules/admin/feedback/feedback.module#FeedbackModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/vnc', loadChildren: './modules/admin/device/device.module#DeviceModule', canActivate: [AuthGuard] },
          { path: 'admin/device', loadChildren: './modules/admin/device/device.module#DeviceModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/ticket', loadChildren: './modules/admin/ticket/ticket.module#TicketModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/ticketdetail', loadChildren: './modules/admin/ticket.detail/ticket.detail.module#TicketDetailModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/ticketcategory', loadChildren: './modules/admin/ticket.category/ticket.category.module#TicketCategoryModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/tutorial', loadChildren: './modules/admin/tutorial/tutorial.module#TutorialModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/tutorialcategory', loadChildren: './modules/admin/tutorial.category/tutorial.category.module#TutorialCategoryModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/companypartner', loadChildren: './modules/admin/company.partner/company.partner.module#CompanyPartnerModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/user', loadChildren: './modules/admin/user/user.module#UserModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/vehicle', loadChildren: './modules/admin/vehicle/vehicle.module#VehicleModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/website', loadChildren: './modules/admin/website/website.module#WebsiteModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/sync', loadChildren: '../../mvc/modules/sync/sync.module#SyncModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/function', loadChildren: '../../mvc/modules/function/function.module#FunctionModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: LayoutMetronicSassComponent,
        children: [
          { path: 'admin/account', loadChildren: '../../mvc/modules/account/account.module#AccountModule', canActivate: [AuthGuard] },
        ]
      },
      {
        path: '',
        component: TemplateSignInComponent,
        children: [
          { path: 'admin/login', loadChildren: '../../mvc/modules/account/signin/signin.module#AccountSignInModule' },
        ]
      },
      {
        path: '',
        component: TemplateSignInComponent,
        children: [
          { path: 'admin/signin', loadChildren: '../../mvc/modules/account/signin/signin.module#AccountSignInModule' },
        ]
      },
      {
        path: '',
        component: TemplateSignInComponent,
        children: [
          { path: 'admin/forgot', loadChildren: '../../mvc/modules/account/forgot/forgot.module#AccountForgotModule' },
        ]
      },
      {
        path: '',
        component: TemplateSignInComponent,
        children: [
          { path: 'admin/lock', loadChildren: '../../mvc/modules/account/lock/lock.module#AccountLockModule' },
        ]
      },
      {
        path: '',
        component: XoeraPartnerLayoutComponent,
        children: [
          { path: '**', loadChildren: './modules/client/pages/pages.module#PagesModule', canActivate: [XoeraPartnerAuthGuard] }
        ]
      },
    ], { initialNavigation: 'enabled' }),
    GridModule,
    BrowserAnimationsModule,
  ],
  providers: [
    MvcDialogService,
    MvcEventService, MvcApiService, MvcDataService, MvcAuthService,
    ApiService, DataService, AuthService, UtilService, ApiBookingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
