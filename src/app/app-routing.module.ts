import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { StoriesComponent } from './stories/stories.component';
import { AdminComponent } from './admin/admin.component';
import { AdminallpostsComponent } from './adminallposts/adminallposts.component';
import { DemoComponent } from './demo/demo.component';


const routes: Routes = [
  { path: '', redirectTo: 'stories', pathMatch: 'full' },
  {
    path : '', 
    component:AppComponent,
  },
  {
    path : 'demo', 
    component:DemoComponent,
  },
  {
    path : 'home', 
    component:HomeComponent,
  },
  {
    path : 'profile', 
    component:ProfileComponent,
  },
  {
    path : 'upload', 
    component:UploadComponent,
  },
  {
    path : 'register', 
    component:RegistrationComponent,
  },
  {
    path : 'login', 
    component:LoginComponent,
  },
  {
    path : 'stories', 
    component:StoriesComponent,
  },  
  {
    path : 'admin', 
    component:AdminComponent,
  },
  {
    path : 'all-posts', 
    component:AdminallpostsComponent,
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
