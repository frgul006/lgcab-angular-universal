import gql from 'graphql-tag';

export const componentBySlug = gql`
  query componentBySlug($slug: String!) {
    pageComponent(where: { slug: $slug }) {
      slug
      title
      preamble
      content
    }
  }
`;
