import gql from 'graphql-tag';

export const splash = gql`
  query splash {
    splashes {
      title
      subtitle
      callToAction
      backgroundImage {
        url
      }
    }
  }
`;
