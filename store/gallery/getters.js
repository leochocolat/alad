export const getters = {
	photos(state) {
		return state.photos;
	},

	current(state) {
		return state.current;
	},

	collections(state) {
		return state.collections;
    },
    
	currentColletion(state) {
		return state.currentColletion;
	}
}

export default getters
