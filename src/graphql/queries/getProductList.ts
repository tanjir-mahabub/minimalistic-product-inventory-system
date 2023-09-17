import { gql } from '@apollo/client';

export const GET_PRODUCT_LIST = gql`
  query ProductQuery {
    products {
      id
      name
      description
      stock
      price
    }
  }
`