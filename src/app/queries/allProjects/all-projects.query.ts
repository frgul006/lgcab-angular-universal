import gql from 'graphql-tag';

export const allProjectsQuery = gql`
  query allProjects {
    projects(orderBy: title_ASC) {
      id
      title
      description
      role
      createdAt
      currentStatus
    }
  }
`;
