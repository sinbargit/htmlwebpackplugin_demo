export default function(state = {name: 'xiaobai'}, action) {
	switch (action.type) {
		case 'async':
			return {
				...state,
				...action.payload
			};
		case 'changeColor':
			state.style.backgroundColor = action.payload.flag
				? '#eff4f4'
				: '#FFFFFF';
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}