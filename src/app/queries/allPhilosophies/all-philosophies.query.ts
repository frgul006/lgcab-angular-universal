import gql from 'graphql-tag';

export const allPhilosophiesQuery = gql`
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
