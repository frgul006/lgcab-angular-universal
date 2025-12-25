import { Address } from './address.model';

export class Contact {
  phoneNo: string;
  organizationNo: string;
  email: string;
  invoiceEmail?: string;
  postAddress: Address;
  visitingAddress: Address;
}
