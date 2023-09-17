import { gql } from '@apollo/client';

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct($input: products_insert_input!) {
    insert_products_one(object: $input) {
      name
      description
      price
      stock
    }
  }
`;

export interface AddProductMutationData {
  addProduct: {
    name: string;
    description: string;
    price: number;
    stock: number;
  };
}

export interface AddProductMutationVariables {
  input: {
    name: string;
    description: string;
    price: number;
    stock: number;
  };
}