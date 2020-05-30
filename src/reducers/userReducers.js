export default function userReducers(state, action) {
    debugger
    switch (action.type) {
        case "SHOW":
            return {
                loading: action.loading,
                user: action.user
            }
        default:
            return state
    }
}
