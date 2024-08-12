import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css'],
})
export class RechercheComponent implements OnInit {
  transactions: any[] = [];
  searchId: string = '';
  searchedTransaction: any = null;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getDataFromBackend();
  }

  getDataFromBackend(): void {
    this.backendService.getData().subscribe({
      next: (response) => {
        this.transactions = response;
        console.log('Données récupérées avec succès :', this.transactions);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      },
    });
  }

  getDataById(): void {
    if (!this.searchId) {
      return;
    }
    this.backendService.getDataById(this.searchId).subscribe({
      next: (response) => {
        this.searchedTransaction = response;
        console.log('Données récupérées par ID avec succès :', response);
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des données par ID :',
          error
        );
        this.searchedTransaction = null; // Clear the previous result if there's an error
      },
    });
  }
}
