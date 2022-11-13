import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef!: ComponentRef<ModalComponent>
  private componentSubscriber!: Subject<string>
  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  openModal(
    entry: ViewContainerRef,
    modalTitle: string,
    modalBody: string,
  ) {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    console.log('OPENED')
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    //console.log('confirm')
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}
