export default function authReducers(state, action) {
    switch (action.type) {
        case "REGISTER":
            return {
                msg: action.registermsg,
                loading: action.loading,
                error: action.error,
                status: action.status
            }
        default:
            return state
    }
}
