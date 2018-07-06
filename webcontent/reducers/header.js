export default function(state={},action) {
	switch (action.type){
		case 'reload': return {
			...state,
			...action.payload
		};
		default: return state;
	}
}