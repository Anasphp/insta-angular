import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { Globals } from './globals';
import { StoriesComponent } from './stories/stories.component';
import { AdminComponent } from './admin/admin.component';
import { AdminallpostsComponent } from './adminallposts/adminallposts.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    UploadComponent,
    StoriesComponent,
    AdminComponent,
    AdminallpostsComponent,
    TimeAgoPipe,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatFileUploadModule,
    CommonModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
