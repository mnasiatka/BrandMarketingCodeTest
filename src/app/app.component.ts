import { Component, ViewChild } from '@angular/core';
import {
  ContactItemDto,
  ListAction
} from './models';
import { ContactService } from './services/contact-service';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { AddContactModalContent } from './components/modals/add-contact-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('successMessage') successMessage;

  title = 'list-app-ql';
  contacts: ContactItemDto[];

  actions: ListAction[] = [
    { title: "Refresh data", func: this.refreshDataAction.bind(this) },
    { title: "Add new", func: this.addNewContactAction.bind(this) },
  ];

  constructor(private contactService: ContactService, private modalService: NgbModal) {
  }

  async ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.displaySuccessMessage(false);
  }

  async fetchData() {
    this.contactService.getContacts().subscribe(result => this.contacts = result);
  }

  formatPhoneNumber(str: string) {
    var cleaned = ('' + str).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return "";
  }

  addNewContactAction(): void {
    this.displaySuccessMessage(false);
    const modalRef = this.modalService.open(AddContactModalContent);
    modalRef.componentInstance.item = new ContactItemDto();
    modalRef.componentInstance.title = 'Add new contact';

    modalRef.result.then(item => {
      if (!item) {
        return;
      }
      console.log("Added new contact:", JSON.stringify(item));

      this.contacts.push(item);
      this.displaySuccessMessage(true);
    });
  }

  refreshDataAction(): void {
    this.fetchData();
    this.displaySuccessMessage(false);
  }

  displaySuccessMessage(val: boolean) {
    this.successMessage.nativeElement.hidden = !val;
  }
}
