export default function diaryReducers(state, action) {
    switch (action.type) {
        case "SET":
            return {
                loading: action.loading,
                diary: action.payload
            }
        case "CREATE":
            return {
                loading: action.loading,
                diary: [...state.diary, action.payload]
            }

        default:
            return state
    }
}
