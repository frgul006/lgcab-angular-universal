export class Contact {
  phone: string;
  email: string;
  orgNo: string;
  visitingAddress: Address;
  postAddress: Address;
}

export class Address {
  content: string; // markdown
  mapUrl: string;
}

export class Component {
  title: string;
  preamble: string;
  content: string; // markdown
}

export class Philosophy {
  title: string;
  imgUrl: string;
  content: string; // markdown
}

export class PBL {
  title: string;
  content: string; // markdown
}
