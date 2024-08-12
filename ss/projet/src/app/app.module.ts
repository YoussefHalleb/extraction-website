import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DonneesComponent } from './components/donnees/donnees.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { SigninComponent } from './components/signin/signin.component';
import { UploadComponent } from './components/upload/upload.component';
import { OcrUploadComponent } from './components/ocr-upload/ocr-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    LoginComponent,
    HeaderComponent,
    DonneesComponent,
    RechercheComponent,
    SigninComponent,
    UploadComponent,
    OcrUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
