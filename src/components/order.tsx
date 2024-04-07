import { Icon } from "@iconify/react";
import React, { Fragment } from "react";
import Image from "next/image";
import { useOrderStore } from "@/store/order";
import type { CartType } from "@/store/order";

type OrderProps = {
  className: string;
};

export default function Order({ className }: OrderProps) {
  const { carts, isPayment, increaseQty, decreaseQty, setNote, setIsPayment, removeFromCart } = useOrderStore((state) => state);

  const subtotal = carts.reduce((total, cart: CartType) => {
    return (total += cart.total);
  }, 0);

  return (
    <div className={`bg-[#1F1D2B] ${className} flex flex-col`}>
      <div className="p-6">
        <p className="barlow-semibold text-white text-[20px] mb-5">Orders #34562</p>
        <div className="flex gap-x-3">
          <button type="button" className="text-white bg-[#FFCA40] hover:bg-[#ffc940]/50 barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Dine In
          </button>
          <button type="button" className="text-white bg-[#1F1D2B] hover:bg-[#ffc940]/50 border-2 border-[#393C49] barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Take It
          </button>
          <button type="button" className="text-white bg-[#1F1D2B] hover:bg-[#ffc940]/50 border-2 border-[#393C49] barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Delivery
          </button>
        </div>
      </div>
      <div className="p-0 max-h-[415px] overflow-y-auto">
        <table className="w-full text-sm text-left text-white" style={{ tableLayout: "fixed" }}>
          <thead className="text-[16px] barlow-semibold border-b border-b-[#393C49] sticky top-0 bg-[#1F1D2B]">
            <tr>
              <th className="px-6 py-3" style={{ width: "60%" }}>
                Item
              </th>
              <th className="px-6 py-3" style={{ width: "18%" }}>
                Qty
              </th>
              <th className="px-6 py-3" style={{ width: "25%" }}>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {carts.length > 0 ? (
              carts.map((cart: CartType, i) => (
                <Fragment key={i}>
                  <tr>
                    <td className="px-6 pt-4 pb-2 barlow-medium text-white ">
                      <div className="flex items-center gap-x-2">
                        <Image src={cart.image} width="45" height="45" alt={cart.name} />
                        <p className="flex flex-col w-3/4">
                          <span className="truncate">{cart.name}</span>
                          <span className="text-[#ABBBC2]">Rp {cart.price}</span>
                        </p>
                      </div>
                    </td>
                    <td className="pe-2 pt-4 pb-2 flex items-center gap-x-1">
                      <input type="number" readOnly value={cart.qty} min="0" className="w-12 bg-[#2D303E] border border-[#393C49] text-white text-sm rounded-lg block p-2.5" />
                      <div>
                        <Icon onClick={() => increaseQty(cart)} icon="eva:arrow-up-fill" width="20" height="20" className="text-[#FFCA40] cursor-pointer" />
                        <Icon onClick={() => decreaseQty(cart)} icon="eva:arrow-down-fill" width="20" height="20" className="text-[#FFCA40] cursor-pointer" />
                      </div>
                    </td>
                    <td className="ps-4 pt-4 pb-2">Rp {cart.total}</td>
                  </tr>
                  <tr>
                    <td className="ps-6 pb-2" colSpan={2}>
                      <input type="text" onChange={(e: any) => setNote(cart, e.target.value)} value={cart.note} className="w-full bg-[#2D303E] border border-[#393C49] text-white text-sm rounded-lg block p-2.5" placeholder="Please, just a little bit spicy only." />
                    </td>
                    <td className="pb-2 ps-4" colSpan={1}>
                      <button type="button" onClick={() => removeFromCart(cart)} className="border-2 border-[#FFCA40] hover:bg-[#ffc940]/50 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center me-2">
                        <Icon icon="iconoir:trash" className="text-[#EA7C69]" width={15} height={15} />
                      </button>
                    </td>
                  </tr>
                </Fragment>
              ))
            ) : (
              <tr>
                <td className="px-6 pt-4 pb-2 barlow-medium text-white text-base" colSpan={3}>
                  Cart is Empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="absolute bottom-0 z-20 p-6 border-t border-t-[#393C49] w-full bg-[#1F1D2B]">
        <ul className="flex flex-col space-y-5 barlow-regular">
          <li className="flex justify-between">
            <span className="text-[#ABBBC2]">Discount</span>
            <span className="text-white">Rp 0</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[#ABBBC2]">Sub total</span>
            <span className="text-white">Rp {subtotal || 0}</span>
          </li>
        </ul>
        <button type="button" onClick={() => setIsPayment(true)} className={`${carts.length > 0 ? "" : "hidden"} text-white bg-[#FFCA40] hover:bg-[#ffc940]/50 border-2 border-[#393C49] poppins-bold rounded-lg text-[14px] px-5 py-2.5 mt-9 w-full`}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
