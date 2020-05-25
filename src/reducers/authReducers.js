export default function authReducers(state, action) {
    switch (action.type) {
        case "REGISTER":
            debugger
            return {
                msg: action.registermsg,
                loading: action.loading,
                error: action.error,
                status: action.status
            }

        case "LOGIN":


            return  {

            }
        default:
            return state
    }
}
