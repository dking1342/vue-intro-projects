<template>
  <div>
    <div v-for="project in projects" :key="project.id">
      {{ project.title }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Projects",
  setup() {
    const store = useStore();
    let token = computed(() => store.state.authentication.token);
    let projects = ref([]);

    onMounted(async () => {
      const response = await fetch("http://localhost:3333/api/v0/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`
        }
      });
      const data = await response.json();
      projects.value = data;
      console.log(projects.value);
    });

    return {
      projects
    };
  }
};
</script>

<style scoped></style>
