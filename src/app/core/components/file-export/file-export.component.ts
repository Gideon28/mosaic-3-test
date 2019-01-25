import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-file-export',
  templateUrl: './file-export.component.html',
  styleUrls: ['./file-export.component.scss']
})
export class FileExportComponent implements OnInit {

  bsModalRef: BsModalRef;
  @Input() isEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  download() {
    console.log('download');
  }

}
