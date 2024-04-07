import { useOrderStore } from "@/store/order";
import type { CartType } from "@/store/order";
import { Icon } from "@iconify/react";
import { Fragment } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

type PaymentProps = {
  className: string;
};

export default function Payment({ className }: PaymentProps) {
  const { carts, setIsPayment, setNote, syncStock } = useOrderStore((state) => state);

  const subtotal = carts.reduce((total, cart: CartType) => {
    return (total += cart.total);
  }, 0);

  function successOrder() {
    toast.success("Order Success", {
      position: "top-center",
      bodyClassName: "text-center text-[#FFCA40] barlow-bold text-xl h-32",
      closeButton: false,
      icon: false,
      hideProgressBar: true,
      autoClose: 500,
      onClose: () => {
        setIsPayment(false);
        syncStock();
      },
    });
  }

  return (
    <div className={`${className} flex bg-[#000000]/70`}>
      <div className="w-[30%] h-full"></div>
      <div className="bg-[#1F1D2B] w-[35%] h-full rounded-l-2xl p-6 relative">
        <Icon icon="ep:back" width={24} height={24} className="text-white mb-4 rounded-full object-cover" onClick={() => setIsPayment(false)} />
        <div className="flex items-center justify-between">
          <p className="flex flex-col">
            <span className="text-white barlow-semibold text-[28px]">Confirmation</span>
            <span className="text-[#ABBBC2] barlow-medium text-[16px]">Orders #34562</span>
          </p>
          <button type="button" className="text-white bg-[#FFCA40] hover:bg-[#ffc940]/50 barlow-medium rounded-lg text-sm p-4">
            <Icon icon="ph:plus-bold" width={24} height={24} className="text-white" />
          </button>
        </div>
        <hr className="border-t-2 border-t-[#393C49] mt-5 mb-4" />
        <div className="p-0 max-h-[415px] overflow-y-auto">
          <table className="w-full text-sm text-left text-white">
            <tbody>
              {carts.map((cart: CartType, i) => (
                <Fragment key={i}>
                  <tr>
                    <td className="pt-4 pb-2 barlow-medium text-white ">
                      <div className="flex items-center gap-x-2">
                        <Image src={cart.image} width="45" height="45" alt={cart.name} />
                        <p className="flex flex-col w-3/4">
                          <span className="truncate">{cart.name}</span>
                          <span className="text-[#ABBBC2]">Rp {cart.price}</span>
                        </p>
                      </div>
                    </td>
                    <td className="pt-4 pb-2 flex items-center gap-x-1">
                      <input type="number" readOnly value={cart.qty} min="0" className="w-12 bg-[#2D303E] border border-[#393C49] text-white text-sm rounded-lg block p-2.5" />
                    </td>
                    <td className="pt-4 pb-2">Rp {cart.total}</td>
                  </tr>
                  <tr>
                    <td className="pb-2" colSpan={2}>
                      <input type="text" onChange={(e) => setNote(cart, e.target.value)} value={cart.note} className="w-full bg-[#2D303E] border border-[#393C49] text-white text-sm rounded-lg block p-2.5" placeholder="Please, just a little bit spicy only." />
                    </td>
                    <td className="pb-2 ps-4" colSpan={1}>
                      <button type="button" className="border-2 border-[#FFCA40] hover:bg-[#ffc940]/50 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center me-2">
                        <Icon icon="iconoir:trash" className="text-[#EA7C69]" width={15} height={15} />
                      </button>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 left-0 z-20 p-6 border-t border-t-[#393C49] w-full bg-[#1F1D2B] rounded-bl-2xl">
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
        </div>
      </div>
      <div className="relative bg-[#1F1D2B] w-[35%] h-full p-6 border-l-2 border-l-[#393C49]">
        <div className="flex items-center mt-[calc(24px+16px)]">
          <p className="flex flex-col">
            <span className="text-white barlow-semibold text-[28px]">Payment</span>
            <span className="text-[#ABBBC2] barlow-medium text-[16px]">3 payment method available</span>
          </p>
        </div>
        <hr className="border-t-2 border-t-[#393C49] mt-5 mb-4" />
        <div>
          <p className="text-white barlow-semibold text-[20px] mb-4">Payment Method</p>
          <ul className="flex gap-x-2 mb-5">
            <li>
              <button type="button" className="relative flex flex-col items-center gap-y-1 w-[110px] barlow-medium px-2 py-[10px] text-sm font-medium text-white bg-[#252836] border-2 border-[#ABBBC2] rounded-lg text-center">
                <span className="absolute right-0 top-2 text-white bg-[#ffca40] font-medium rounded-full text-sm p-[2px] text-center inline-flex items-center me-2">
                  <Icon icon="material-symbols:check" width={12} height={12} className="text-[#1F1D2B]" />
                </span>
                <Icon icon="solar:card-outline" width={24} height={24} className="text-white" />
                <span>Credit Card</span>
              </button>
            </li>
            <li>
              <button type="button" className="relative flex flex-col items-center gap-y-1 w-[110px] barlow-medium px-2 py-[10px] text-sm font-medium text-[#ABBBC2] bg-[#1F1D2B] border-2 border-[#393C49] rounded-lg text-center">
                <Icon icon="mingcute:paypal-line" width={24} height={24} />
                <span>Paypal</span>
              </button>
            </li>
            <li>
              <button type="button" className="relative flex flex-col items-center gap-y-1 w-[110px] barlow-medium px-2 py-[10px] text-sm font-medium text-[#ABBBC2] bg-[#1F1D2B] border-2 border-[#393C49] rounded-lg text-center">
                <Icon icon="solar:wallet-outline" width={24} height={24} />
                <span>Cash</span>
              </button>
            </li>
          </ul>
          <ul className="space-y-4">
            <li>
              <label htmlFor="cardholder" className="block mb-2 text-sm barlow-medium text-white">
                Cardholder Name
              </label>
              <input type="text" id="cardholder" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type Cardholder Name" />
            </li>
            <li>
              <label htmlFor="cardnumber" className="block mb-2 text-sm barlow-medium text-white">
                Card Number
              </label>
              <input type="text" id="cardnumber" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type Card Number" />
            </li>
            <li className="flex gap-x-2">
              <div className="w-full">
                <label htmlFor="expiration" className="block mb-2 text-sm barlow-medium text-white">
                  Expiration Date
                </label>
                <input type="date" id="expiration" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type Expiration Date" />
              </div>
              <div className="w-full">
                <label htmlFor="ccv" className="block mb-2 text-sm barlow-medium text-white">
                  CCV
                </label>
                <input type="text" id="ccv" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type CVV" />
              </div>
            </li>
            <li className="flex gap-x-2">
              <div className="w-full">
                <label className="block mb-2 text-sm barlow-medium text-white">Order Type</label>
                <div className="relative">
                  <svg className="w-2.5 h-2.5 text-white absolute left-3 top-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                  <select defaultValue="dine_in" id="countries" className="bg-[#1f1d2b] text-white border-2 border-[#393C49] text-sm rounded-lg block w-full p-2.5 ps-7 appearance-none">
                    <option value="dine_in">Dine In</option>
                    <option value="take_it">Take It</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="table" className="block mb-2 text-sm barlow-medium text-white">
                  Table no.
                </label>
                <input type="text" id="table" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type No. Table" />
              </div>
            </li>
          </ul>
        </div>
        <div className="flex gap-x-2 absolute bottom-0 left-0 p-6 w-full z-10">
          <button type="button" onClick={() => setIsPayment(false)} className="w-full text-[#FFCA40] hover:text-white bg-[#1F1D2B] hover:bg-[#ffc940]/50 border-2 border-[#FFCA40] barlow-medium rounded-lg text-sm px-5 py-2.5 mb-2">
            Cancel
          </button>
          <button type="button" onClick={successOrder} className="w-full text-white bg-[#FFCA40] hover:bg-[#ffc940]/50 border-2 border-[#FFCA40] barlow-medium rounded-lg text-sm px-5 py-2.5 mb-2">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
