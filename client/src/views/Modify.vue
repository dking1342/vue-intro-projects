<template>
  <div class="modify-container">
    <div class="form-container">
      <h1>{{ action }} {{ type }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-control">
          <label for="text">{{ type === 'Project' ? 'Title' : 'Description'}}</label>
          <input type="text" name="text" :value="type === 'Project' ? text.title : text.description" @keyup="handleInput" />
        </div>
        <div class="form-control-submit">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  name: "Modify",
  setup() {
    const router = useRouter();
    const route = useRoute();
    let store = useStore();
    let projects = computed(()=> store.state.projects.projects);
    let tasks = computed(()=> store.state.projects.tasks);
    let token = computed(()=> store.state.authentication.token);
    let action = ref("");
    let type = ref("");
    let id = ref("");
    let text = ref('');
    let updatedText = ref('');

    action.value = route.params.action.slice(0,1).toUpperCase() + route.params.action.slice(1,route.params.action.length);
    type.value = route.params.type.slice(0,1).toUpperCase() + route.params.type.slice(1,route.params.type.length);
    id.value = route.params.id;

    const handleSubmit = async () => {
        if(action.value === 'Update' && type.value === 'Project'){
          const response = await fetch(`http://localhost:3333/api/v0/projects/${id.value}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`
            },
            body:JSON.stringify({title:updatedText.value})
          });
          const data = await response.json();
          store.commit('projects/updateProjectTitle',data);
        }
        if(action.value === 'Update' && type.value === 'Task'){
          const response = await fetch(`http://localhost:3333/api/v0/tasks/${id.value}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`
            },
            body:JSON.stringify({description:updatedText.value})
          });
          const data = await response.json();
          store.commit('projects/updateTaskDescription',data);
        }
        if(action.value === 'Add' && type.value === 'Project'){
          const response = await fetch(`http://localhost:3333/api/v0/projects`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`
            },
            body:JSON.stringify({title:updatedText.value})
          });
          const data = await response.json();
          store.commit('projects/addProject',data);            
        }
        if(action.value === 'Add' && type.value === 'Task'){
          const response = await fetch(`http://localhost:3333/api/v0/projects/${id.value}/tasks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`
            },
            body:JSON.stringify({description:updatedText.value})
          });
          const data = await response.json();
          store.commit('projects/addTask',data);            
        }
        router.push("/projects")
    }

    const handleInput = (e) => {
        updatedText.value = e.target.value;
    }

    onMounted(()=> {
        if(action.value === 'Update' && type.value === 'Project') {
            text.value = projects.value.filter(project=> project.id === Number(id.value))[0]
        }
        if(action.value === 'Update' && type.value === 'Task'){
            text.value = tasks.value.filter(task=> task.id === Number(id.value))[0];
        }
    })

    return {
        action,
        type,
        text,
        handleSubmit,
        handleInput
    }
  }
};
</script>

<style scoped>
.modify-container {
  max-width: 768px;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  background-color: #f4f4f4;
  margin: 0 auto;
}
.form-container {
  width:100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.form-container form {
    display:flex;
    width:100%;
    flex-direction: column;
    gap:20px;
    margin-top: 20px;
    align-items: center;
}
.form-control {
    width:350px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    align-items: center;
    justify-content: center;
    gap:15px;
    height:50px;
}
.form-control label {
    font-size: 22px;
}
.form-control input[type="text"] {
    height:80%;
    padding:10px;
    font-size: 20px;
    border:none;
    outline:none;
    appearance: none;
}
.form-control input[type="text"]:focus {
    border:1px solid steelblue;
}
.form-control-submit {
    display:block;
    height:50px;
    width:350px;
}
.form-control-submit input {
    width:100%;
    height:100%;
    background-color: steelblue;
    border:none;
    outline:none;
    appearance: none;
    color:#fff;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
}
.form-control-submit input:active {
    filter:brightness(50%)
}
</style>
