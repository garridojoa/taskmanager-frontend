import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CookieService }    from 'ngx-cookie-service';

import { AppComponent }         from './app.component';
import { TasksComponent }       from './tasks/tasks.component';
import { MessagesComponent }    from './messages/messages.component';
import { AppRoutingModule }     from './app-routing.module';
import { TaskDetailComponent }  from './task-detail/task-detail.component';
import { HttpClientModule }     from '@angular/common/http';
import { LoginComponent }       from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    MessagesComponent,
    TaskDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
