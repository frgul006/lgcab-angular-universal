import gql from 'graphql-tag';

export const allPhilosophies = gql`
  query allPhilosophies {
    philosophies(orderBy: order_ASC) {
      order
      title
      content
      image {
        url
      }
    }
  }
`;
