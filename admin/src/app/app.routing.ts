import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { AdminDetailsComponent } from './admins/admin-details/admin-details.component';
import { AdminListComponent } from './admins/admin-list/admin-list.component';
import { SettingsComponent } from './settings/settings.component';
import { SlideListComponent } from './slides/slide-list/slide-list.component';
import { SlideNewComponent } from './slides/slide-new/slide-new.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: PageListComponent, data: { name: 'PageListComponent' }, canActivate: [AuthGuard] },
  { path: 'admins', component: AdminListComponent, data: { name: 'AdminListComponent' }, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, data: { name: 'SettingsComponent' }, canActivate: [AuthGuard] },
  { path: 'slides', component: SlideListComponent, data: { name: 'SlideListComponent' }, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent, data: { name: 'LoginComponent' } },

  { path: '**', redirectTo: '' }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
