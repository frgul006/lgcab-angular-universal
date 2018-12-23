import gql from 'graphql-tag';

export const allProjects = gql`
  query allProjects {
    projects(orderBy: title_ASC) {
      id
      slug
      title
      description
      role
      createdAt
      currentStatus
    }
  }
`;
