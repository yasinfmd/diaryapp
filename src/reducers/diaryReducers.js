export default function diaryReducers(state, action) {
    switch (action.type) {
        case "SET":
            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary
            }
        case "SETGROUPEDDIARY":
            return {
                diary: state.diary,
                groupeduserdiary: action.payload,
                loading: action.loading
            }
        case "CREATE":
            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary
            }

        case "DELETE":

            //gruplanmışa da bak


            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary
            }

        default:
            return state
    }
}
