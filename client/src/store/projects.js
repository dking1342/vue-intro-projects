
const state = {
    projects: [],
    tasks: [],
}

const getters = {
    getProject(state, ) {
        console.log(state.projects)
    }
}

const mutations = {
    setProjects(state,items) {
        state.projects = items;
    },
    setTasks(state, items) {
        state.tasks = items;
    },
    clearTasks(state) {
        state.tasks = [];
    },
    updateProjectTitle(state,payload){
        state.projects = state.projects.map(project => {
            if(project.id === Number(payload.id)){
                return {
                    ...project,
                    title: payload.title
                }
            }
            return project;
        })
    },
    updateTaskDescription(state,payload){
        state.tasks = state.tasks.map(task => {
            if(task.id === Number(payload.id)){
                return {
                    ...task,
                    description: payload.description
                }
            }
            return task;
        })
    },
    addProject(state,payload){
        state.projects = [...state.projects,payload];
    },
    addTask(state,payload){
        state.tasks = [...state.tasks,payload];
    },
    removeTask(state,payload){
        state.tasks = state.tasks.filter(task=> task.id !== payload.id);
    },
    removeProject(state,payload){
        state.projects = state.projects.filter(project=> project.id !== payload.id);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}