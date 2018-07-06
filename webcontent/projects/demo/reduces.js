export default function(state={}, action) {
    if(action.type!=="@@redux/INIT")
    {
        const _state = JSON.parse(JSON.stringify(state))
        _state[action.type].style = action.payload
        return _state
    }
    else return state;
}