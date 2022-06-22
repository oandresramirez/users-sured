import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AccordionModule } from 'primeng/accordion';
import { UserComponent } from './components/pages/user/user.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule, RippleModule, AccordionModule, TableModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    FormsModule,
    InputNumberModule, 
    DialogModule, 
    ToastModule, 
    ConfirmDialogModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
