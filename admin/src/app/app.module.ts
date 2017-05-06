import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageListComponent } from './pages/page-list/page-list.component';

import { routing } from './app.routing';
import { SettingsComponent } from './settings/settings.component';
import { AdminDetailsComponent } from './admins/admin-details/admin-details.component';
import { AdminListComponent } from './admins/admin-list/admin-list.component';
import { SlideListComponent } from './slides/slide-list/slide-list.component';
import { SlideNewComponent } from './slides/slide-new/slide-new.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PageDetailsComponent,
    PageListComponent,
    SettingsComponent,
    AdminDetailsComponent,
    AdminListComponent,
    SlideListComponent,
    SlideNewComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
