import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './components/pdf/pdf.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DonneesComponent } from './components/donnees/donnees.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { SigninComponent } from './components/signin/signin.component';
import { UploadComponent } from './components/upload/upload.component';
import { OcrUploadComponent } from './components/ocr-upload/ocr-upload.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pdf', component: PdfComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'donnees', component: DonneesComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'image', component: UploadComponent },
  { path: 'table', component: OcrUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
