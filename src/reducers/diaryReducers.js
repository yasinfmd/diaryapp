export default function diaryReducers(state, action) {
    switch (action.type) {
        case "SET":
            return {
                error:action.error,
                showdiar:state.showdiar,
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary.reverse()
            }
        case "SETGROUPEDDIARY":
            return {
                error:action.error,
                showdiar:state.showdiar,
                diary: state.diary,
                groupeduserdiary: action.payload,
                loading: action.loading
            }
        case "CREATE":
            return {
                error:action.error,
                showdiar:state.showdiar,
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary.reverse()
            }
        case "SHOW":
            return {
                error:action.error,
                groupeduserdiary: state.groupeduserdiary.reverse(),
                loading: action.loading,
                showdiar:action.payload,
                diary: state.diary,
            }

        case "DELETE":
            return {
                error:action.error,
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: action.groupeduser ? action.groupeduser : state.groupeduserdiary.reverse()
            }

        default:
            return state
    }
}
