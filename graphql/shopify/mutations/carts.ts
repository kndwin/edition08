import { gql } from "@apollo/client";

const MAX_CART_ITEM = 250;

export const CREATE_CART = gql`
mutation CreateCart($cartInput: CartInput) {
	cartCreate(input: $cartInput) {
		cart {
			id
			createdAt
			updatedAt
			lines(first: ${MAX_CART_ITEM}) {
				edges {
					node {
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
								}
							}
						}
						quantity
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
}`;
