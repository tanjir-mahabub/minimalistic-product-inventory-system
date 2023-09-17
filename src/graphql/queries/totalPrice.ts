import { gql } from '@apollo/client';

export const TOTAL_PRICE = gql`
  query TotalPriceQuery {
    products_aggregate {
      aggregate {
        sum {
            price
        }
      }
    }
  }
`