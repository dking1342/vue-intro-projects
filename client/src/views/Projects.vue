<template>
  <div class="view-container">
    <div class="project-container">
      <div class="project-header">
        <h1>Projects</h1>
        <button class="add" @click="handleModify('add','project',null)" >+</button>
      </div>
      <div v-for="project in projects" :key="project.id" class="projects">
        <div class="project-card">
          <button @click="handleTasks(project.id, project.title)" class="btn-title">{{ project.title }}</button>
          <div class="btn-container">
            <button @click="handleModify('add','task',project.id)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="green"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
            </button>
            <button @click="handleModify('update','project',project.id)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="navy" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
              </svg>
            </button>
            <button @click="handleDelete('project',project.id)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#ff0000" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="task-container" v-if="tasks.length && taskHeader">
      <div class="task-header">
        <h1>{{ taskHeader }}: tasks</h1>
        <button @click="handleClearTasks" class="close-btn">X</button>
      </div>
      <div v-for="task in tasks" :key="task.id" class="tasks">

        <div class="task-card">
          <button  class="btn-title">{{ task.description }}</button>
          <div class="btn-container">
            <button @click="handleModify('update','task',task.id)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="navy" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
              </svg>
            </button>
            <button @click="handleDelete('task',task.id)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#ff0000" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from 'vue-router';

export default {
  name: "Projects",
  setup() {
    const store = useStore();
    let token = computed(() => store.state.authentication.token);
    let projects = computed(()=> store.state.projects.projects);
    let tasks = computed(()=> store.state.projects.tasks);
    let taskHeader = ref('');
    const router = useRouter();
    
    const handleTasks = async (id,project) => {
      store.commit('projects/clearTasks');
      taskHeader.value = project;
      const response = await fetch(`http://localhost:3333/api/v0/projects/${id}/tasks`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.value}`
        }
    });
      const data = await response.json();
      store.commit('projects/setTasks',data);
    }

    const handleModify = (action,type,id) => {
      router.push(`/modify/${action}/${type}/${id}`);
    }

    const handleDelete = async (type, id) => {
      if(type === 'task'){
        const response = await fetch(`http://localhost:3333/api/v0/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`
          }
        });
        const data = await response.json();
        store.commit('projects/removeTask',data);
      }
      if(type === 'project'){
        const response = await fetch(`http://localhost:3333/api/v0/projects/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`
          }
        });
        const data = await response.json();
        store.commit('projects/removeProject',data);
      }
    }

    const handleClearTasks = () => {
      store.commit('projects/clearTasks');
    }

    onMounted(async () => {
      const response = await fetch("http://localhost:3333/api/v0/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`
        }
      });
      const data = await response.json();
      store.commit('projects/setProjects',data)
    });

    return {
      projects,
      tasks,
      taskHeader,
      handleTasks,
      handleClearTasks,
      handleModify,
      handleDelete,
    };
  }
};
</script>

<style scoped>
.view-container {
  max-width: 768px;
  height: fit-content;
  padding:20px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap:25px;
  background-color: #f4f4f4;
  margin:0 auto;
}
.project-container, .task-container {
  width:100%;
  padding:20px;
  background-color: #fff;
}
.projects, .tasks {
  width:100%;
  border-bottom: 1px solid #ddd;
  margin:20px 0;
}
.project-card, .task-card {
  width:100%;
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.btn-title {
  background-color: transparent;
  border:none;
  outline:none;
  cursor: pointer;
  font-size: 18px;
}
.btn-container {
  display:flex;
  gap:25px;
}
.btn-container button {
  border:none;
  outline:none;
  width:25px;
  background-color: transparent;
  cursor: pointer;
}
.btn-container button svg {
  pointer-events: none;
}
.task-header, .project-header {
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.task-header button,
.project-header button {
  width:50px;
  height:50px;
  color:#fff;
  opacity: 0.5;
  border-radius: 50%;
  border:none;
  outline:none;
  cursor: pointer;
  font-size: 24px;
}
.add {
  background-color: green;
}
.close-btn {
  background-color: #000;
}
</style>
