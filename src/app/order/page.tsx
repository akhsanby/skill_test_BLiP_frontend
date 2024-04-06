"use client";
import Image from "next/image";
import { useOrderStore } from "@/store/order";
import type { TypeFoodType, FoodListType } from "@/store/order";

import SidebarComponent from "@/components/sidebar";
import ContentComponent from "@/components/content";
import OrderComponent from "@/components/order";

export default function Home() {
  const { typeFood, foodList, changeTypeFood, addToCart } = useOrderStore((state) => state);

  function filteredFoodList() {
    const activeType = typeFood.filter((type: TypeFoodType) => type.active === true);
    const result = foodList.filter((food: FoodListType) => food.type === activeType[0].name);
    return result;
  }

  return (
    <main className="relative">
      <SidebarComponent />
      <ContentComponent className="absolute left-[100px] bottom-0 top-0 py-[22px] px-[20px] w-3/5">
        <ul className="barlow-semibold text-[14px] flex gap-x-8 pt-[24px] pb-[34px]">
          {typeFood.map((type, i) => (
            <li key={i} onClick={() => changeTypeFood(type)} className={`${type.active ? "text-[#FFCA40] type-food-border" : "text-white"} cursor-pointer`}>
              <span>{type.name}</span>
            </li>
          ))}
        </ul>
        <div className="text-white barlow-semibold text-[20px] flex items-center justify-between mb-[24px]">
          <p>Choose Dishes</p>
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-[#1f1d2b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
            <svg className="w-2.5 h-2.5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            Dine In{" "}
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-[calc(28px+35px)] pt-[35px] pb-[20px] h-[calc(100vh-300px)] sm:h-[calc(100vh-280px)] md:h-[calc(100vh-260px)] lg:h-[calc(100vh-240px)] overflow-y-scroll">
          {filteredFoodList().map((food, i) => (
            <div key={i} className="bg-[#1F1D2B] h-[260px] rounded-[16px] relative flex justify-center cursor-pointer" onClick={() => addToCart(food)}>
              <Image src={food.image} alt={food.name} width={150} height={150} className="absolute -top-[35px]" />
              <div className="absolute bottom-0 text-center text-white p-[24px] space-y-1">
                <p className="barlow-semibold text-[14px]">{food.name}</p>
                <p className="poppins-medium text-[14px]">Rp. {food.price}</p>
                <p className="poppins-medium text-[12px] text-[#ABBBC2]">{food.qty} Bowls available</p>
              </div>
            </div>
          ))}
        </div>
      </ContentComponent>
      <OrderComponent className="absolute left-[calc(60%+100px)] h-screen" />
    </main>
  );
}
