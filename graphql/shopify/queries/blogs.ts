import { gql } from '@apollo/client'

const MAX_ARTICLES = 10

export const GET_ARTICLES = gql`
	query GetArticles($blogHandle: String) {
		blog(handle: $blogHandle) {
			articles(first: ${MAX_ARTICLES}) {
				edges {
					node {
						id
						handle
						title
						contentHtml
						image {
							id
							originalSrc
							altText
						}
					}
				}
			}
		}
	}
`

export const GET_ARTICLE_FROM_ID = gql`

	query GetArticles($blogHandle: String) {
		blog(handle: $blogHandle) {
			articles(first: ${MAX_ARTICLES}) {
				edges {
					node {
						id
						handle
						title
						contentHtml
						image {
							id
							originalSrc
							altText
						}
					}
				}
			}
		}
	}
`
