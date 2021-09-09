<template>
  <div class="card">
    <div class="card-header">
      <img class="card-img" :src="productItem.image" :alt="productItem.title" />
      <h3 class="card-title">{{ productItem.title }}</h3>
    </div>
    <div class="card-body">
      <div class="card-body-container">
        <div class="card-price">${{ productItem.price.toFixed(2) }}</div>
        <div
          :class="[productItem.rating.count > 0 ? 'available' : 'unavailable']"
          class="card-availability"
        >
          Available
        </div>
        <div class="card-rating">Rating: {{ productItem.rating.rate }}</div>
      </div>
      <router-link :to="`/product/${product.id}`" class="card-btn">
        View Item
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "ProductList",
  props: {
    product: Object,
  },
  setup(props) {
    let productItem = ref(props.product);

    return {
      productItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 350px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #eee;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
  gap: 7px;

  .card-header {
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 225px;
      object-fit: contain;
    }

    .card-title {
      width: 100%;
      text-align: left;
      margin-top: 5px;
      font-size: 18px;
    }
  }

  .card-body {
    width: 100%;
    padding: 10p 0;
    border-radius: 5px;
    background-color: #fff;

    .card-body-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      width: 100%;
      height: 60px;
      padding: 5px;
      border-radius: 5px;
      background-color: #444;

      .card-price {
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        grid-column: 1/2;
        grid-row: 1/3;
        justify-self: center;
        align-self: center;
      }

      .card-availability {
        color: #fff;
        grid-column: 2/3;
        grid-row: 1/3;
        justify-self: center;
        align-self: center;
        height: 80%;
        width: 75%;
        text-align: center;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 5px;
      }
      .available {
        background-color: green;
      }
      .unavailable {
        background-color: red;
      }

      .card-rating {
        grid-column: 1/2;
        grid-row: 3/4;
        align-self: center;
        justify-self: center;
        color: #fff;
        font-size: 12px;
      }
    }
  }

  .card-footer {
    margin-top: 5px;
    display: none;
    flex-direction: column;
    font-size: 12px;
    border-radius: 5px;
    padding: 10px;
  }
  .card-btn {
    margin-top: 10px;
    display: flex;
    width: 100%;
    height: 60px;
    background-color: steelblue;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;

    &:active {
      background-color: #666;
    }
  }
}
</style>
