import { Icon } from "@iconify/react";
import { useMenuStore } from "@/store/menu";
import { useOrderStore } from "@/store/order";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

type AddMenuProps = {
  className?: string;
};

export default function AddMenu({ className }: AddMenuProps) {
  const { tempAddMenu, setAddMenuOpen, setTempAddMenu } = useMenuStore((state) => state);
  const { addNewFood } = useOrderStore((state) => state);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");

  const onChangePicture = (e: any) => {
    setImagePreview(URL.createObjectURL(e.target.files?.[0]));
    setImage(e.target.files?.[0]);
  };

  async function saveFood(e: any) {
    e.preventDefault();
    if (!tempAddMenu.type) {
      toast.error("Please choose type of food", {
        position: "top-center",
        bodyClassName: "text-center text-red-500 barlow-bold text-xl",
        closeButton: false,
        icon: false,
        autoClose: 2000,
      });
      return;
    }
    const result = await uploadImage();

    toast.success("New Menu saved", {
      position: "top-center",
      bodyClassName: "text-center text-[#FFCA40] barlow-bold text-xl h-32",
      closeButton: false,
      icon: false,
      hideProgressBar: true,
      autoClose: 1000,
      onClose: () => {
        setAddMenuOpen(false);
        addNewFood({ ...tempAddMenu, image: result.path });
      },
    });
  }

  async function uploadImage() {
    if (!image) return;
    try {
      var formdata = new FormData();
      formdata.append("file", image);
      formdata.append("type", tempAddMenu.type.toLowerCase().replace(/\s/g, "_"));

      var requestOptions = { method: "POST", body: formdata };

      const response = await fetch("/api/upload", requestOptions);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={`${className} flex bg-[#000000]/70`}>
      <div className="w-3/5 h-full"></div>
      <div className="w-2/5 bg-[#1F1D2B] h-full rounded-l-2xl p-6 relative">
        <div className="flex items-center gap-x-4">
          <Icon onClick={() => setAddMenuOpen(false)} icon="ep:back" width={24} height={24} className="text-white" />
          <p className="text-white barlow-semibold text-[28px]">Add New Dish</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <button onClick={(e: any) => setTempAddMenu({ ...tempAddMenu, type: e.target.innerText })} type="button" className={`text-white ${tempAddMenu.type == "Hot Dishes" ? "bg-[#FFCA40]" : "bg-[#1F1D2B]"} hover:bg-[#ffc940]/50 border-2 border-[#393C49] barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
            Hot Dishes
          </button>
          <button onClick={(e: any) => setTempAddMenu({ ...tempAddMenu, type: e.target.innerText })} type="button" className={`text-white ${tempAddMenu.type == "Cold Dishes" ? "bg-[#FFCA40]" : "bg-[#1F1D2B]"} hover:bg-[#ffc940]/50 border-2 border-[#393C49] barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
            Cold Dishes
          </button>
          <button onClick={(e: any) => setTempAddMenu({ ...tempAddMenu, type: e.target.innerText })} type="button" className={`text-white ${tempAddMenu.type == "Soup" ? "bg-[#FFCA40]" : "bg-[#1F1D2B]"} hover:bg-[#ffc940]/50 border-2 border-[#393C49] barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
            Soup
          </button>
          <button onClick={(e: any) => setTempAddMenu({ ...tempAddMenu, type: e.target.innerText })} type="button" className={`text-white ${tempAddMenu.type == "Grill" ? "bg-[#FFCA40]" : "bg-[#1F1D2B]"} hover:bg-[#ffc940]/50 border-2 border-[#393C49] barlow-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
            Grill
          </button>
        </div>
        <hr className="border-t-2 border-t-[#393C49] mt-5 mb-4" />
        <div className="relative border-dashed border-2 rounded-lg border-[#FFCA40]">
          <input onChange={onChangePicture} type="file" className="opacity-0 h-36 w-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-5">
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="rounded-full w-[130px] h-[130px] object-cover" />
            ) : (
              <Fragment>
                <Icon icon="ph:plus-bold" width={24} height={24} className="text-[#FFCA40]" />
                <p className="barlow-semibold text-base text-[#FFCA40]">Add picture</p>
              </Fragment>
            )}
          </div>
        </div>
        <form onSubmit={saveFood}>
          <ul className="space-y-4 mt-6">
            <li>
              <label htmlFor="productname" className="block mb-2 text-sm barlow-medium text-white">
                Product Name
              </label>
              <input onChange={(e: any) => setTempAddMenu({ ...tempAddMenu, name: e.target.value })} value={tempAddMenu.name} type="text" id="productname" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type Product Name" required />
            </li>
            <li>
              <label htmlFor="Price" className="block mb-2 text-sm barlow-medium text-white">
                Price
              </label>
              <input onChange={(e: any) => setTempAddMenu({ ...tempAddMenu, price: parseInt(e.target.value) })} value={tempAddMenu.price} type="number" id="Price" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type Price" required />
            </li>
            <li>
              <label htmlFor="Stock" className="block mb-2 text-sm barlow-medium text-white">
                Stock
              </label>
              <input onChange={(e: any) => setTempAddMenu({ ...tempAddMenu, qty: parseInt(e.target.value) })} value={tempAddMenu.qty} type="number" id="Stock" className="bg-[#2D303E] border border-[#393C49] barlow-medium text-white text-sm rounded-lg block w-full px-3 py-2.5" placeholder="Type Stock" required />
            </li>
          </ul>
          <div className="flex gap-x-2 absolute bottom-0 left-0 p-6 w-full z-10">
            <button onClick={() => setAddMenuOpen(false)} type="button" className="w-full text-[#FFCA40] hover:text-white bg-[#1F1D2B] hover:bg-[#ffc940]/50 border-2 border-[#FFCA40] barlow-medium rounded-lg text-sm px-5 py-2.5 mb-2">
              Cancel
            </button>
            <button type="submit" className="w-full text-white bg-[#FFCA40] hover:bg-[#ffc940]/50 border-2 border-[#FFCA40] barlow-medium rounded-lg text-sm px-5 py-2.5 mb-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
