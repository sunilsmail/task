import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AppLayoutComponent } from './features/layout/appLayout/appLayout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent //
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: 'login' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
