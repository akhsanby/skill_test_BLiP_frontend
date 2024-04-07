import { create } from "zustand";
import type { FoodListType } from "./order";
import { v4 as uuid } from "uuid";

type MenuStoreType = {
  isAddMenuOpen: boolean;
  isUpdateMenuOpen: boolean;
  tempAddMenu: {
    id: string;
    type: string;
    image: string;
    name: string;
    price: number;
    qty: number;
  };
  tempUpdateMenu: {
    id: string;
    type: string;
    image: string;
    name: string;
    price: number;
    qty: number;
  };
  setAddMenuOpen: (bool: boolean) => void;
  setUpdateMenuOpen: (bool: boolean) => void;
  setTempAddMenu: (food: FoodListType) => void;
  setTempUpdateMenu: (food: FoodListType) => void;
};

export const useMenuStore = create<MenuStoreType>((set) => ({
  isAddMenuOpen: false,
  isUpdateMenuOpen: false,
  tempAddMenu: {
    id: uuid(),
    type: "",
    image: "",
    name: "",
    price: 0,
    qty: 0,
  },
  tempUpdateMenu: {
    id: uuid(),
    type: "",
    image: "",
    name: "",
    price: 0,
    qty: 0,
  },
  setAddMenuOpen: (bool: boolean) => set(() => ({ isAddMenuOpen: bool })),
  setUpdateMenuOpen: (bool: boolean) => set(() => ({ isUpdateMenuOpen: bool })),
  setTempAddMenu: (data: any) => set(() => ({ tempAddMenu: data })),
  setTempUpdateMenu: (data: any) => set(() => ({ tempUpdateMenu: data })),
}));
