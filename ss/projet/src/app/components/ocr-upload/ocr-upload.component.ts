import { Component } from '@angular/core';
import { OcrServiceService } from 'src/app/ocr-service.service';

@Component({
  selector: 'app-ocr-upload',
  templateUrl: './ocr-upload.component.html',
  styleUrls: ['./ocr-upload.component.css'],
})
export class OcrUploadComponent {
  file: File | null = null;
  data: any[] = [];

  constructor(private ocrService: OcrServiceService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (this.file) {
      this.ocrService.processFile(this.file).subscribe(
        (response) => {
          this.data = response;
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    }
  }
}
