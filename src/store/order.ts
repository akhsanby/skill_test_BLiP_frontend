import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist, createJSONStorage } from "zustand/middleware";

export type TypeFoodType = {
  name: string;
  active: boolean;
};

export type FoodListType = {
  id: string;
  type: string;
  image: string;
  name: string;
  price: number;
  qty: number;
};

export type CartType = {
  id: string;
  type: string;
  image: string;
  name: string;
  price: number;
  qty: number;
  total: number;
  note: string;
};

export const useOrderStore = create(
  persist(
    (set: any, get: any) => ({
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
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food1.png",
          name: "Spicy seasoned seafood noodles",
          price: 43000,
          qty: 20,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food2.png",
          name: "Salted Pasta with mushroom sauce",
          price: 35000,
          qty: 11,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food3.png",
          name: "Beef dumpling in hot and sour soup",
          price: 65000,
          qty: 16,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food4.png",
          name: "Healthy noodle with spinach leaf",
          price: 43000,
          qty: 20,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food5.png",
          name: "Hot spicy fried rice with omelet",
          price: 57000,
          qty: 13,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food6.png",
          name: "Spicy seasoned seafood noodles",
          price: 45000,
          qty: 17,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food7.png",
          name: "Healthy noodle with spinach leaf",
          price: 23000,
          qty: 20,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food8.png",
          name: "Hot spicy fried rice with omelet",
          price: 37900,
          qty: 13,
        },
        {
          id: uuid(),
          type: "Hot Dishes",
          image: "/images/hot_dishes/food9.png",
          name: "Spicy instant noodle with special omelette",
          price: 64000,
          qty: 20,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food1.png",
          name: "Ice Cream Vanilla with sugar balmon",
          price: 43000,
          qty: 20,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food2.png",
          name: "Vanilla Cream with colorful ice",
          price: 35000,
          qty: 11,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food3.png",
          name: "Ice Dream Coffee",
          price: 65000,
          qty: 16,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food4.png",
          name: "Ice Cream Vanilla with sugar balmon",
          price: 65000,
          qty: 22,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food5.png",
          name: "Angsle",
          price: 57000,
          qty: 13,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food6.png",
          name: "Daluman",
          price: 45000,
          qty: 17,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food7.png",
          name: "Healthy noodle with spinach leaf",
          price: 23000,
          qty: 22,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food8.png",
          name: "Coconut Water with Lemon Tea",
          price: 37900,
          qty: 13,
        },
        {
          id: uuid(),
          type: "Cold Dishes",
          image: "/images/cold_dishes/food9.png",
          name: "Orange juice",
          price: 64000,
          qty: 17,
        },
      ],
      carts: [],
      isPayment: false,
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
      addNewFood: (food: FoodListType) => set((state: any) => ({ foodList: [...state.foodList, food] })),
      updateOldFood: (food: FoodListType) =>
        set((state: any) => ({
          ...state,
          foodList: state.foodList.map((item: FoodListType) => {
            if (food.id === item.id) {
              return { ...item, ...food };
            }
            return { ...item };
          }),
        })),
      addToCart: (food: FoodListType) =>
        set((state: any) => {
          const isExistCart = state.carts.some((cart: CartType) => cart.id === food.id);
          if (isExistCart) {
            return {
              ...state,
              carts: state.carts.map((cart: CartType) => {
                if (cart.id === food.id) {
                  return { ...cart, qty: cart.qty + 1, total: cart.total + cart.price };
                }
                return { ...cart };
              }),
            };
          } else {
            const newCart = {
              id: food.id,
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
      removeFromCart: (food: FoodListType) =>
        set((state: any) => {
          const newCarts = state.carts.filter((cart: CartType) => cart.id !== food.id);
          return { ...state, carts: newCarts };
        }),
      increaseQty: (item: CartType) =>
        set((state: any) => {
          return {
            ...state,
            carts: state.carts.map((cart: CartType) => {
              if (cart.id === item.id) {
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
              } else if (cart.id === item.id) {
                return { ...cart, qty: item.qty - 1, total: item.total - item.price };
              }
              return { ...cart };
            }),
          };
        }),
      setNote: (item: CartType, note: string) =>
        set((state: any) => {
          return {
            ...state,
            carts: state.carts.map((cart: CartType) => {
              if (cart.id === item.id) {
                return { ...cart, note };
              }
              return { ...cart };
            }),
          };
        }),
      setIsPayment: (bool: boolean) => set(() => ({ isPayment: bool })),
      syncStock: () =>
        set((state: any) => ({
          ...state,
          foodList: state.foodList.map((food: FoodListType) => {
            const r = state.carts.map((cart: CartType) => {
              if (food.id === cart.id && food.qty > cart.qty) {
                return { ...food, qty: food.qty - cart.qty };
              }
              return { ...food };
            });
            return r[0];
          }),
          carts: [],
        })),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
