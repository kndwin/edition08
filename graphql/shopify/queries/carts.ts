import { gql } from "@apollo/client";

const MAX_CART_ITEM = 250;

export const GET_CART_ID = gql`
query GetCartId {
	shop {
		cartId @client
	}
}
`;

export const GET_CART_FROM_ID = gql`
query GetCartFromId($cartId: ID!) {
	cart(id: $cartId) {
		id
		createdAt
		updatedAt
		lines(first: ${MAX_CART_ITEM}) {
			edges {
				node {
					quantity
					estimatedCost {
						subtotalAmount {
							amount
							currencyCode
						}
					}
					merchandise {
						... on ProductVariant {
							id
							title
							image {
								originalSrc
							}
							priceV2 {
								amount
								currencyCode
							}
						}
					}
				}
			}
		}
		estimatedCost {
			subtotalAmount {
				amount
				currencyCode
			}
		}
	}
}
`;
