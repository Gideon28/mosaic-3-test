import { Component, Input, OnInit } from '@angular/core';

import { Download } from '../../models/download.model';

@Component({
  selector: 'app-download-table',
  templateUrl: './download-table.component.html',
  styleUrls: ['./download-table.component.scss']
})
export class DownloadTableComponent implements OnInit {

  @Input() downloads: Download[];
  @Input() filterKey: string;
  @Input() filterValue: string;

  constructor() { }

  ngOnInit() {
  }

}
