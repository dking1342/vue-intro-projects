<template>
  <div v-if="loading" class="message-box">Loading</div>
  <div v-if="!loading && error" class="message-box">{{ error }}</div>
  <div v-if="!loading && products.length" class="home">
    <div v-for="product in products" :key="product.id" class="products">
      <ProductList :product="product" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import ProductList from "../components/ProductList.vue";

export default {
  name: "Home",
  components: {
    ProductList,
  },
  setup() {
    let products = ref([]);
    let error = ref(null);
    let loading = ref(false);

    const getProducts = () => {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          json
            ? (products.value = json)
            : (error.value = "Error when fetching");
        })
        .catch(() => (error.value = "Error when fetching. Please try again"));
    };

    onMounted(() => {
      getProducts();
    });

    return {
      products,
      error,
      loading,
    };
  },
};
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
.products {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
