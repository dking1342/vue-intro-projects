<template>
  <div class="cart-container">
    <div class="cart-contents">
      <div v-for="lis in list" :key="lis.id" class="cart-item">
        <img :src="lis.image" :alt="lis.title" />
        <div class="item-container">
          <span>{{ lis.title }}</span>
          <span>{{ lis.quantity }}</span>
          <span>${{ lis.totalCost.toFixed(2) }}</span>
        </div>
        <div class="btn-container">
          <button @click="handleEdit(lis.id)" class="edit-btn">v</button>
          <button @click="handleDelete(lis.id)" class="delete-btn">x</button>
        </div>
      </div>
    </div>
    <div class="checkout-container">
      <div class="cost-container">
        <span>Cost: </span>
        <span>${{ cost.toFixed(2) }}</span>
      </div>
      <button @click="handlePurchase">Purchase</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  name: "Cart",
  setup() {
    let list = ref([]);
    let router = useRouter();
    let cost = ref(0);

    const handleEdit = (id) => {
      router.push(`/product/${id}`);
    };

    const handleDelete = (id) => {
      list.value = list.value.filter((list) => list.id !== id);
      cost.value = list.value.reduce((acc, val) => acc + +val.totalCost, 0);
      localStorage.setItem("checkout", JSON.stringify(list.value));
    };

    const handlePurchase = () => {
      localStorage.removeItem("checkout");
      list.value = [];
      router.push("/");
      // backend call to save into db
    };

    onMounted(() => {
      if (localStorage.getItem("checkout")) {
        list.value = JSON.parse(localStorage.getItem("checkout"));
        cost.value = list.value.reduce((acc, val) => acc + +val.totalCost, 0);
      }
    });

    return {
      list,
      cost,
      handleEdit,
      handleDelete,
      handlePurchase,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  background-color: rgba(215, 210, 210, 0.25);
  border-radius: 5px;
  gap: 15px;
  padding: 15px;
  height: 50vh;

  .cart-contents {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 7px;
    align-items: center;
    justify-content: flex-start;

    .cart-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      height: 75px;
      width: 100%;
      background-color: rgb(174, 174, 255);
      padding: 10px;
      overflow: initial;

      img {
        height: 100%;
        width: 50px;
        object-fit: contain;
        border-radius: 15px;
        object-position: center;
      }

      .item-container {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        margin: 0 10px;

        span {
          font-size: 12px;
          text-align: center;
        }
      }

      .btn-container {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
        justify-content: center;

        button {
          padding: 5px 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          border: none;
          appearance: none;
          cursor: pointer;
          border-radius: 5px;

          &:active {
            filter: brightness(50%);
          }
        }

        .edit-btn {
          background-color: rgb(44, 44, 141);
          color: #fff;
        }

        .delete-btn {
          background-color: rgb(247, 67, 67);
          color: #fff;
        }
      }
    }
  }

  .checkout-container {
    display: flex;
    flex-direction: column;
    gap: 25px;

    .cost-container {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      font-weight: bold;
    }

    button {
      display: block;
      width: 100%;
      height: 60px;
      background-color: yellow;
      color: #000;
      font-size: 32px;
      text-transform: uppercase;
      text-align: center;
      outline: none;
      border: none;
      appearance: none;
      border-radius: 5px;
      cursor: pointer;

      &:active {
        filter: brightness(50%);
      }
    }
  }
}
</style>
