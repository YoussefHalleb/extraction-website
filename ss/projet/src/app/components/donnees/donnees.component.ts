import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-donnees',
  templateUrl: './donnees.component.html',
  styleUrls: ['./donnees.component.css'],
})
export class DonneesComponent implements OnInit {
  transactions: any[] = [];

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

  deleteData(id: string): void {
    this.backendService.deleteData(id).subscribe({
      next: (response) => {
        console.log('Données supprimées avec succès :', response);
        this.getDataFromBackend(); // Rafraîchir les données après suppression
      },
      error: (error) => {
        console.error('Erreur lors de la suppression des données :', error);
      },
    });
  }
}
