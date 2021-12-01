export type CartItem = {
	merchandiseId: string,
	productVariantId: string
	image: string
	title: string
	price: string
	quantity: number
}

export type Cart = {
	items: CartItem[]
	subtotal: string
	checkoutUrl: string
}
