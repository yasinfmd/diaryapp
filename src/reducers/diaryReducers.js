export default function diaryReducers(state, action) {
    switch (action.type) {
        case "SET":
            debugger
            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary
            }
        case "SETGROUPEDDIARY":
            debugger
            return {
                diary: state.diary,
                groupeduserdiary: action.payload,
                loading: action.loading
            }
        case "CREATE":
            debugger
            return {
                loading: action.loading,
                diary: action.payload,
                groupeduserdiary: state.groupeduserdiary
            }
        default:
            return state
    }
}
