import gql from 'graphql-tag';

export const contactQuery = gql`
  query contactQ {
    contacts {
      phoneNo
      organizationNo
      email
      postAddress {
        content
        mapUrl
      }
      visitingAddress {
        content
        mapUrl
      }
    }
  }
`;
