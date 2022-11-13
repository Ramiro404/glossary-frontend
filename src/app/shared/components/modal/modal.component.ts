import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit,  OnDestroy {
  @Input() title = '';
  @Input() body = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  constructor() { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    console.log('Modal init')
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() {
    this.confirmEvent.emit('confirm');
  }

}
