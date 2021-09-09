<template>
  <div class="message-box" v-if="loading">loading...</div>
  <div class="message-box" v-if="!loading && error">{{ error }}</div>
  <div class="product" v-if="!loading && Object.values(product).length">
    <h1>{{ product.title }}</h1>
    <div class="product-container">
      <div class="product-container-left">
        <img :src="product.image" :alt="product.title" />
        <p>{{ product.description }}</p>
      </div>
      <div class="product-container-right">
        <div class="checkout-wrapper price-container">
          <span>Price:</span>
          <span>${{ product.price.toFixed(2) }}</span>
        </div>
        <div class="checkout-wrapper selection-container">
          <span>Quantity:</span>
          <span>
            <select v-model="quantity">
              <option
                v-for="opt in Array(Number(product.rating.count))
                  .fill()
                  .map((x, i) => i + 1)"
                :key="opt"
                :value="opt"
              >
                {{ opt }}
              </option>
            </select>
          </span>
        </div>
        <div class="checkout-wrapper confirmation-container">
          <span>Total Price:</span>
          <span>${{ totalCost.toFixed(2) }}</span>
        </div>
        <div class="checkout-wrapper checkout-container">
          <button @click="handleCheckout">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Product",
  setup() {
    let product = ref({});
    let error = ref(null);
    let loading = ref(false);
    let route = useRoute();
    let router = useRouter();
    let quantity = ref(1);
    let totalCost = ref(0);

    const getProduct = (id) => {
      loading.value = true;
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => {
          json ? (product.value = json) : (error.value = "Error when fetching");
        })
        .catch(() => (error.value = "Error when loading"));
      loading.value = false;
    };

    onMounted(() => {
      getProduct(route.params.id);
    });

    // watch(getProduct, () => {
    //   if (localStorage.getItem("checkout")) {
    //     let pendingCheckoutItems = JSON.parse(localStorage.getItem("checkout"));
    //     let filteredItem = pendingCheckoutItems.filter(
    //       (item) => item.id === product.value.id
    //     );
    //   }
    // });

    const stopEffect = watchEffect(() => {
      if (Object.values(product.value).length) {
        totalCost.value =
          Number(product.value.price.toFixed(2)) * Number(quantity.value);
      } else {
        totalCost.value = 0;
      }
    });

    const handleCheckout = () => {
      stopEffect();
      let checkoutItem = {
        id: product.value.id,
        title: product.value.title,
        image: product.value.image,
        quantity: quantity.value,
        totalCost: totalCost.value,
      };

      if (localStorage.getItem("checkout")) {
        let items = JSON.parse(localStorage.getItem("checkout"));
        items = items.filter((item) => item.id !== checkoutItem.id);
        let newItems = [...items, checkoutItem];
        localStorage.setItem("checkout", JSON.stringify(newItems));
      } else {
        localStorage.setItem("checkout", JSON.stringify([checkoutItem]));
      }
      router.push("/cart");
    };

    return {
      product,
      error,
      loading,
      quantity,
      totalCost,
      handleCheckout,
    };
  },
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    width: 100%;
    padding: 10px 0;
    display: block;
    text-align: center;
  }

  .product-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    background-color: rgba(214, 210, 210, 0.25);

    border-radius: 5px;
    gap: 15px;

    &-left {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      background-color: #fff;
      align-items: center;
      border-radius: 5px;
      gap: 10px;

      img {
        width: 300px;
        object-fit: contain;
        object-position: center;
      }

      p {
        padding: 10px;
        text-align: justify;
      }
    }

    &-right {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 7px;

      .checkout-wrapper {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        padding: 10px 5px;
      }

      select {
        height: 50px;
        width: 100px;
        font-size: 24px;
        text-align: center;
        background-color: transparent;
        outline: none;
        border: none;
      }

      .checkout-container button {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;
        background-color: rgb(255, 255, 93);
        font-size: 22px;
        font-weight: bold;
        text-transform: uppercase;
        color: rgb(31, 31, 31);
        transition: 0.4s ease;

        &:active {
          background-color: rgb(172, 172, 44);
        }
      }
    }
  }
}
</style>
