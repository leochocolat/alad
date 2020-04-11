export const actions = {
    setPhotos({ commit }, photos) {
        commit('SET_PHOTOS', photos);
    },

    setCurrent({ commit }, current) {
        commit('SET_CURRENT', current);
    },

    setCollections({ commit }, collections) {
        commit('SET_COLLECTIONS', collections);
    },

    setCurrentCollection({ commit }, currentCollection) {
        commit('SET_CURRENT_COLLECTION', currentCollection);
    },
}

export default actions;