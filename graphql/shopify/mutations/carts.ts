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

export const ADD_ITEM_TO_CART = gql`
	mutation AddLineToCart($cartLineInput: [CartLineInput!]!, $cartId: ID!) {
		cartLinesAdd(lines: $cartLineInput, cartId: $cartId) {
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
	}
`

export const REMOVE_ITEM_FROM_CART = gql`
	mutation RemoveLineFromCart($cartId: ID! , $lineIds: [ID!]! ) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
			cart {
				id
			}
		}
	}
`
