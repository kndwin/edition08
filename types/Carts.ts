export type CartItem = {
	image: string
	title: string
	price: string
	quantity: number
}

export type Cart = {
	items: CartItem[]
	subtotal: string
}
