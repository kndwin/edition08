import { InMemoryCache } from "@apollo/client";
import { useLocalStorage } from 'hooks'

const { getItem } = useLocalStorage()

export const shopifyCache = new InMemoryCache({
	typePolicies:{
		Shop: {
			fields: {
				cartId: {
					read(_, { variables }) {
						return getItem({ key: "cartId"})
					},
				}
			}
		}
	}
})
