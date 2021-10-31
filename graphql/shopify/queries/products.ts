import { gql } from '@apollo/client'

const MAX_PRODUCTS = 100
const MAX_VARIANTS = 10
const MAX_IMAGES = 10
const FIRST_IMAGE = 1

export const GET_PRODUCTS = gql`
	query GetProducts {
		products(first: ${MAX_PRODUCTS}){
			edges{
				node{
					id
					title
					descriptionHtml
					variants(first: ${MAX_VARIANTS}) {
						edges {
							node {
								id
							}
						}
					}
					images(first: ${FIRST_IMAGE}) {
						edges {
							node {
								originalSrc
							}
						}
					}
				}
			}
		}
	}
`
export const GET_PRODUCT_FROM_ID = gql`
	query GetProductFromId($productId: ID) {
		product(id: $productId) {
			id
			title
			descriptionHtml
			variants(first: ${MAX_VARIANTS}) {
				edges {
					node {
						id
					}
				}
			}
			images(first: ${MAX_IMAGES}) {
				edges {
					node {
						originalSrc
					}
				}
			}
		}
	}
`
