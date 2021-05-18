import gql from "graphql-tag";

export const SEIYUU_SCORE = gql`
  query Query($staffSearch: String, $top: Int, $rankBy: [MediaSort]) {
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
      characterMedia(sort: $rankBy, perPage: $top) {
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