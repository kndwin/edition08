export function useLocalStorage() {
	const IS_BROWSER = typeof window !== "undefined"
	const localStorage = IS_BROWSER ? window.localStorage : null
	const storage = localStorage?.getItem("state")
	const setStorage = ({ storage }: any) => {
		localStorage?.setItem("state", JSON.stringify(storage))
	}
	type KeyValue = {
		key: string
		value: any
	}
	const setItem = ({ key, value } : KeyValue ) => {
		const state = localStorage?.getItem("state")
		const parsedState = JSON.parse(state ?? "{}")
		const newState = {...parsedState,  [`${key}`]: value}
		localStorage?.setItem("state", JSON.stringify(newState))
	}

	const getItem = ({ key } : {key: string}) => {
		const state = localStorage?.getItem("state")
		const parsedState = JSON.parse(state ?? "{}")
		return parsedState?.[key]
	}
	return {storage, setStorage, setItem, getItem}
}
