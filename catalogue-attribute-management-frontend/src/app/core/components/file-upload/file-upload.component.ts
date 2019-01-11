import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  attachment: any;
  @Input() isEnabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onFileUpload(event: any) {
    this.attachment = event.target.files[0];
  }

  openFileUploader(event: any) {
    console.log(event.target.dataset.input);
    const fileInput = document.querySelector(event.target.dataset.input);
    if (fileInput) {
      fileInput.click();
    }
  }

  resetUploadAttachment() {
    delete this.attachment;
    const fileInput: HTMLInputElement = document.querySelector('#upload-cpa-input') as HTMLInputElement;
    fileInput.value = '';
  }

  submitUpload() {
    // TODO: send file for processing
    this.resetUploadAttachment();
    console.log('submit file');
  }

}
