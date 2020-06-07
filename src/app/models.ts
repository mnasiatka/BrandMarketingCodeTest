export class ContactItemDto {
    _id: string;
    index: number;
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    address: string;
}

export class ContactListModelDto {
    lastFetched: Date;
    contacts: ContactItemDto[];
}

export class ContactModalDto {
    item: ContactItemDto;
}

export class ListAction {
    title: string;
    func: () => void;
}