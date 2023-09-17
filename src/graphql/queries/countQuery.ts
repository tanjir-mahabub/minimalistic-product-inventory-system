import { gql } from '@apollo/client';

export const COUNT_PRODUCTS= gql`
  query CountQuery {
    products_aggregate {
      aggregate {
        count
      }
    }
  }
`