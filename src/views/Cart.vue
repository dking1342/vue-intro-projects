<template>
  <div>cart</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Cart",
  setup() {
    let list = ref([]);

    onMounted(() => {
      if (localStorage.getItem("checkout")) {
        list.value = JSON.parse(localStorage.getItem("checkout"));
        console.log(list.value);
      }
    });

    return {
      list,
    };
  },
};
</script>

<style lang="scss" scoped></style>
