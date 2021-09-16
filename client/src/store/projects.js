
const state = {
    projects: []
}

// const actions = {
//     fetchProjects()
// }

const mutations = {
    getProjects(state,items) {
        state.projects = items;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}