export const mutations = {
	SET_PHOTOS(state, photos) {
		state.photos = photos;
	},
    
	SET_CURRENT(state, current) {
		state.current = current;
    },

    SET_COLLECTIONS(state, collections) {
		state.collections = collections;
    },
    
	SET_CURRENT_COLLECTION(state, currentCollection) {
		state.currentCollection = currentCollection;
	}
}

export default mutations;