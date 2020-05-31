export default function userReducers(state, action) {
    debugger
    switch (action.type) {
        case "SHOW":
            return {
                loading: action.loading,
                user: action.user
            }

        case "UPDATEIMAGE":
            const user = state.user
            user.image = action.payload
            return {
                loading: action.loading,
                user: user
            }
        default:
            return state
    }
}
