import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: '', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
