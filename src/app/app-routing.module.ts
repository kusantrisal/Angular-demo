import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { BrowseComponent } from './browse/browse.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: AuthenticationComponent },
  { path: "login/:signup", component: AuthenticationComponent },
  { path: "browse", component: BrowseComponent },
  { path: "about", component: AboutComponent },
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path:"profile/:edit", component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
