import {Component, Input, OnInit } from '@angular/core';

import { Report } from '../../models/report.model';

@Component({
  selector: 'app-upload-table',
  templateUrl: './upload-table.component.html',
  styleUrls: ['./upload-table.component.scss']
})
export class UploadTableComponent implements OnInit {

  @Input() reports: Report[];

  constructor() { }

  ngOnInit() {
  }

}
