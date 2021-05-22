import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ShowUserComponent } from './component/show-user/show-user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';

import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  { path:'', component:SignInComponent },
  { path:'sign-up', component:SignUpComponent },
  { path:'profile', component:ProfileComponent, canActivate:[AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent,canActivate:[AuthGuard] },
  { path:'user-list', component:ShowUserComponent, canActivate:[AuthGuard] },
  { path:'**', component:SignInComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
