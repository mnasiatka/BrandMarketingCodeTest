import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactItemDto } from 'src/app/models';

@Component({
    selector: 'add-contact-modal',
    templateUrl: './add-contact-modal.html',
    styles: ['./add-contact-modal.scss']
})

export class AddContactModalContent {
    @Input() title: string;
    @Input() item: ContactItemDto;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    save() {
        this.activeModal.close(this.item);
    }

    close() {
        this.activeModal.close();
    }
}
