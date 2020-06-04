export default function diaryReducers(state, action) {
    switch (action.type) {
        case "SET":
            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary.reverse()
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
                groupeduserdiary: state.groupeduserdiary.reverse()
            }

        case "DELETE":
            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: action.groupeduser ? action.groupeduser : state.groupeduserdiary.reverse()
            }

        default:
            return state
    }
}
