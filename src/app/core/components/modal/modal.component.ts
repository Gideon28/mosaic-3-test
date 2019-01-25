import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() footerFormat: string;
  @Input() actionText: string[];
  @Input() content: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
