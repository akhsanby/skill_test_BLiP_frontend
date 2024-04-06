import { create } from "zustand";

export type TypeFoodType = {
  name: string;
  active: boolean;
};

export type FoodListType = {
  type: string;
  image: string;
  name: string;
  price: number;
  qty: number;
};

export type CartType = {
  type: string;
  image: string;
  name: string;
  price: number;
  qty: number;
  total: number;
  note: string;
};

type OrderStoreType = {
  typeFood: TypeFoodType[];
  foodList: FoodListType[];
  carts: CartType[];
  subTotal: number;
  changeTypeFood: (type: TypeFoodType) => void;
  addToCart: (food: FoodListType) => void;
  increaseQty: (item: CartType) => void;
  decreaseQty: (item: CartType) => void;
  setNote: (item: CartType) => void;
};

export const useOrderStore = create<OrderStoreType>((set) => ({
  typeFood: [
    {
      name: "Hot Dishes",
      active: true,
    },
    {
      name: "Cold Dishes",
      active: false,
    },
    { name: "Soup", active: false },
    { name: "Grill", active: false },
    { name: "Appetizer", active: false },
    { name: "Dessert", active: false },
  ],
  foodList: [
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food1.png",
      name: "Spicy seasoned seafood noodles",
      price: 43000,
      qty: 20,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food2.png",
      name: "Salted Pasta with mushroom sauce",
      price: 35000,
      qty: 11,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food3.png",
      name: "Beef dumpling in hot and sour soup",
      price: 65000,
      qty: 16,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food4.png",
      name: "Healthy noodle with spinach leaf",
      price: 43000,
      qty: 20,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food5.png",
      name: "Hot spicy fried rice with omelet",
      price: 57000,
      qty: 13,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food6.png",
      name: "Spicy seasoned seafood noodles",
      price: 45000,
      qty: 17,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food7.png",
      name: "Healthy noodle with spinach leaf",
      price: 23000,
      qty: 20,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food8.png",
      name: "Hot spicy fried rice with omelet",
      price: 37900,
      qty: 13,
    },
    {
      type: "Hot Dishes",
      image: "/images/hot_dishes/food9.png",
      name: "Spicy instant noodle with special omelette",
      price: 64000,
      qty: 20,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food1.png",
      name: "Ice Cream Vanilla with sugar balmon",
      price: 43000,
      qty: 20,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food2.png",
      name: "Vanilla Cream with colorful ice",
      price: 35000,
      qty: 11,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food3.png",
      name: "Ice Dream Coffee",
      price: 65000,
      qty: 16,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food4.png",
      name: "Ice Cream Vanilla with sugar balmon",
      price: 65000,
      qty: 22,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food5.png",
      name: "Angsle",
      price: 57000,
      qty: 13,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food6.png",
      name: "Daluman",
      price: 45000,
      qty: 17,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food7.png",
      name: "Healthy noodle with spinach leaf",
      price: 23000,
      qty: 22,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food8.png",
      name: "Coconut Water with Lemon Tea",
      price: 37900,
      qty: 13,
    },
    {
      type: "Cold Dishes",
      image: "/images/cold_dishes/food9.png",
      name: "Orange juice",
      price: 64000,
      qty: 17,
    },
  ],
  carts: [],
  subTotal: 0,
  changeTypeFood: (type: TypeFoodType) =>
    set((state: any) => ({
      ...state,
      typeFood: state.typeFood.map((item: TypeFoodType) => {
        if (item.name === type.name) {
          return { ...item, active: true };
        }
        return { ...item, active: false };
      }),
    })),
  addToCart: (food: FoodListType) =>
    set((state: any) => {
      const isExistCart = state.carts.some((cart: CartType) => cart.name === food.name);
      if (isExistCart) {
        return {
          ...state,
          carts: state.carts.map((cart: CartType) => {
            if (cart.name === food.name) {
              return { ...cart, qty: cart.qty + 1, total: cart.total + cart.price };
            }
            return { ...cart };
          }),
        };
      } else {
        const newCart = {
          type: food.type,
          image: food.image,
          name: food.name,
          price: food.price,
          qty: 1,
          total: food.price,
          note: "",
        };
        return {
          ...state,
          carts: [...state.carts, newCart],
        };
      }
    }),
  increaseQty: (item: CartType) =>
    set((state: any) => {
      return {
        ...state,
        carts: state.carts.map((cart: CartType) => {
          if (cart.name === item.name) {
            return { ...cart, qty: item.qty + 1, total: item.total + item.price };
          }
          return { ...cart };
        }),
      };
    }),
  decreaseQty: (item: CartType) =>
    set((state: any) => {
      return {
        ...state,
        carts: state.carts.map((cart: CartType) => {
          if (cart.qty === 0) {
            return { ...cart };
          } else if (cart.name === item.name) {
            return { ...cart, qty: item.qty - 1, total: item.total - item.price };
          }
          return { ...cart };
        }),
      };
    }),
  setNote: (item: CartType) =>
    set((state: any) => {
      return {
        ...state,
        carts: state.carts.map((cart: CartType) => {
          if (cart.name === item.name) {
            return { ...cart, note: item.note };
          }
          return { ...cart };
        }),
      };
    }),
}));
