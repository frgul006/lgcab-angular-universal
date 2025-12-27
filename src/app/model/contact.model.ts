import { Address } from './address.model';

export interface Contact {
  phoneNo: string;
  organizationNo: string;
  email: string;
  homepage?: string;
  invoiceEmail?: string;
  postAddress: Address;
  visitingAddress: Address;
}
