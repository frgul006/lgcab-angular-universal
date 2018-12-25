import gql from 'graphql-tag';

export const splashQuery = gql`
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
