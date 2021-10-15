import { useReducer } from "react";

const initialState = {
	hasLoaded: false,
	hasFailed: false,
	errorMsg: null,
	data: null,
};

const reducer = (state, action) => {
	const { type, data, errorMsg } = action;

	switch (type) {
		case "successful":
			return {
				...state,
				hasLoaded: true,
				data,
			};
		case "failed":
			return {
				...state,
				hasLoaded: true,
				hasFailed: true,
				errorMsg: errorMsg,
			};
		default:
			throw new Error();
	}
};

export default function useFetch() {
	return useReducer(reducer, initialState);
}
