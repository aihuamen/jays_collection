import gql from "graphql-tag";

export const SEIYUU_SCORE = gql`
  query Query($staffSearch: String, $top: Int) {
    Staff(search: $staffSearch) {
      id
      name {
        full
        native
      }
      image {
        large
      }
      age
      characterMedia(sort: [SCORE_DESC], perPage: $top) {
        edges {
          id
          characterRole
          node {
            id
            title {
              romaji
              english
            }
            averageScore
            meanScore
            popularity
            rankings {
              rank
              type
              allTime
            }
            seasonYear
          }
          characters {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      } 
    }
  }
`