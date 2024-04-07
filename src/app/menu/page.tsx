"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import type { TypeFoodType, FoodListType } from "@/store/order";
import { useOrderStore } from "@/store/order";
import { useMenuStore } from "@/store/menu";

import SidebarComponent from "@/components/sidebar";
import ContentComponent from "@/components/content";
import AddMenuComponent from "@/components/add_menu";
import EditMenuComponent from "@/components/edit_menu";

export default function menu() {
  const { typeFood, foodList, changeTypeFood } = useOrderStore((state) => state);
  const { isAddMenuOpen, isUpdateMenuOpen, setAddMenuOpen, setUpdateMenuOpen, setTempUpdateMenu } = useMenuStore((state) => state);

  function filteredFoodList() {
    const activeType = typeFood.find((type: TypeFoodType) => type.active === true);
    const result = foodList.filter((food: FoodListType) => food.type === activeType?.name);
    return result;
  }

  return (
    <main className="relative">
      <SidebarComponent />
      <ContentComponent title="Settings" className="absolute left-[100px] bottom-0 top-0 py-[22px] px-[20px] w-[calc(100%-100px)] h-screen">
        <div className="bg-[#1F1D2B] mt-8 w-full h-[calc(100%-44px-32px)] rounded-lg p-6">
          <p className="barlow-semibold text-xl text-white">Products Management</p>
          <ul className="barlow-semibold text-[14px] flex gap-x-8 pt-[24px] pb-[9px] border-b-2 border-[#393C49]">
            {typeFood.map((type, i) => (
              <li key={i} onClick={() => changeTypeFood(type)} className={`${type.active ? "text-[#FFCA40] type-food-border" : "text-white"} cursor-pointer`}>
                <span>{type.name}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-4 gap-4 mt-7 h-[calc(100%-100px)] overflow-y-scroll">
            <div onClick={() => setAddMenuOpen(true)} className="cursor-pointer border-dashed border-2 border-[#FFCA40] rounded-lg h-80 flex flex-col justify-center items-center gap-y-5">
              <Icon icon="ph:plus-bold" width={24} height={24} className="text-[#FFCA40]" />
              <p className="barlow-semibold text-base text-[#FFCA40]">Add new dish</p>
            </div>
            {filteredFoodList().map((food, i) => (
              <div key={i} className="relative border-2 border-[#393C49] rounded-lg h-80 flex flex-col justify-between items-center gap-y-2">
                <Image src={food.image} alt={food.name} width={150} height={150} className="mt-5 rounded-full object-cover" />
                <div>
                  <p className="barlow-medium text-sm text-white text-center">{food.name}</p>
                  <p className="barlow-regular text-sm text-[#ABBBC2] flex gap-x-2 justify-center">
                    <span>Rp. {food.price}</span>
                    <span>&#x2022;</span>
                    <span>{food.qty} Bowls</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUpdateMenuOpen(true);
                    setTempUpdateMenu(food);
                  }}
                  className="bg-[#FFCA40]/30 w-full h-12 rounded-b-lg flex items-center justify-center"
                >
                  <p className="flex gap-x-2">
                    <Icon icon="carbon:edit" width="24" height="24" className="text-[#FFCA40]" />
                    <span className="barlow-semibold text-sm text-[#FFCA40]">Edit dish</span>
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </ContentComponent>
      {isAddMenuOpen && <AddMenuComponent className="absolute z-20 right-0 h-screen w-screen" />}
      {isUpdateMenuOpen && <EditMenuComponent className="absolute z-20 right-0 h-screen w-screen" />}
    </main>
  );
}
