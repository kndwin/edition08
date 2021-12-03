import {makeVar, useReactiveVar} from "@apollo/client";

const layoutVar = makeVar({
	isHeaderDropdownOpen: false,
})

export function useLayout() {
	const { isHeaderDropdownOpen } = useReactiveVar(layoutVar)
	const toggleHeaderDropdown = () => {
		layoutVar({
			...layoutVar(),
			isHeaderDropdownOpen: !isHeaderDropdownOpen
		})
	}
	const setHeaderDropdown = (isOpen: boolean) => {
		layoutVar({
			...layoutVar(),
			isHeaderDropdownOpen: isOpen
		})
	}

	return {
		isHeaderDropdownOpen,
		setHeaderDropdown,
		toggleHeaderDropdown,
	}
	
}
