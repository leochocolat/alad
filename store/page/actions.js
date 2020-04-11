export const actions = {
    setPages({ commit }, pages) {
        commit('SET_PAGES', pages);
    },

    setCurrent({ commit }, current) {
        commit('SET_CURRENT', current);
    },
}

export default actions;