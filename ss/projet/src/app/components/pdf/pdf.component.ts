import { Component, OnInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { BackendService } from 'src/app/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  extractedTextLines: string[] = [];
  transactions: any[] = [];

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.getDataFromBackend();
    const uploadElement = document.getElementById('upload');
    if (uploadElement) {
      uploadElement.addEventListener('change', (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const img = new Image();
            img.onload = () => {
              Tesseract.recognize(img, 'eng', {
                logger: (m: any) => console.log(m),
              }).then(({ data: { text } }) => {
                this.extractedTextLines = text.split('\n');
                console.log('Extracted Text Lines:', this.extractedTextLines);
                this.postDataToBackend(text); // Post the extracted text as a single string
              });
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  logout(): void {
    this.router.navigate(['/']); // Redirect to the login page
  }

  postDataToBackend(text: string): void {
    const transaction = { text }; // Ensure no Id field is included
    this.backendService.postData(transaction).subscribe({
      next: (response) => {
        console.log('Data posted successfully:', response);
        this.getDataFromBackend(); // Refresh data after posting
      },
      error: (error) => {
        console.error('Error posting data:', error);
      },
    });
  }

  getDataFromBackend(): void {
    this.backendService.getData().subscribe({
      next: (response) => {
        this.transactions = response;
        console.log('Data retrieved successfully:', this.transactions);
      },
      error: (error) => {
        console.error('Error retrieving data:', error);
      },
    });
  }

  getDataById(id: string): void {
    this.backendService.getDataById(id).subscribe({
      next: (response) => {
        console.log('Data retrieved by ID successfully:', response);
        // Handle the response data as needed
      },
      error: (error) => {
        console.error('Error retrieving data by ID:', error);
      },
    });
  }

  deleteData(id: string): void {
    this.backendService.deleteData(id).subscribe({
      next: (response) => {
        console.log('Data deleted successfully:', response);
        this.getDataFromBackend(); // Refresh data after deletion
      },
      error: (error) => {
        console.error('Error deleting data:', error);
      },
    });
  }
}
