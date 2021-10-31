import {makeVar, useReactiveVar} from "@apollo/client";

const isCartOpenVar = makeVar(false)

export function useCartDrawer() {
	
	const isOpen = useReactiveVar(isCartOpenVar)

	const toggleCart = () => {
		isCartOpenVar(!isOpen)
	}

	const setIsOpen = (newIsOpen: boolean) => {
		isCartOpenVar(newIsOpen)
	}

	const openCart = () => {
		isCartOpenVar(true)
	}

	return {
		isOpen,
		openCart, 
		toggleCart,
		setIsOpen
	}
	
}
