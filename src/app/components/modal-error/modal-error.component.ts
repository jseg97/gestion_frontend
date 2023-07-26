import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.modalService.dismissAll();
    // this.ngOnInit();
}

}
