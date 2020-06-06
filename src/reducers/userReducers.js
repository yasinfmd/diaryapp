export default function userReducers(state, action) {
    switch (action.type) {
        case "SHOW":
            return {
                loading: action.loading,
                user: action.user
            }
        case "UPDATEUSER":
            let updateuser;
            if (action.loading == false && action.payload) {
                updateuser = state.user
                updateuser.name = action.payload.name
                updateuser.surname = action.payload.surname
                updateuser.fullname = action.payload.name + " " + action.payload.surname
                updateuser.email = action.payload.email
            }
            return {
                loading: action.loading,
                user: updateuser?updateuser:state.user
            }

        case "UPDATEIMAGE":
            const updateserimage = state.user
            updateserimage.image = action.payload
            return {
                loading: action.loading,
                user: updateserimage
            }
        default:
            return state
    }
}
