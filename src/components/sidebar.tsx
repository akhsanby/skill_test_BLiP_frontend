import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="absolute top-0 bottom-0 w-[100px] bg-[#1f1d2b] h-screen py-[24px] rounded-r-[16px] flex flex-col justify-between overflow-hidden">
      <ul className="flex flex-col items-center gap-y-7">
        <li className="bg-[#FFCA40] bg-opacity-25 rounded-[8px] w-[56px] h-[56px] flex items-center justify-center">
          <Icon icon="bxs:store-alt" width="33" className="text-[#FFCA40]" />
        </li>
        <li onClick={() => router.push("/order")} className={`w-[56px] h-[56px] flex items-center justify-center ${pathname === "/order" && "bg-[#FFCA40] rounded-[8px] shadow-[0_0_20px_0_#FFCA40]"}`}>
          <Icon icon="fluent:home-16-regular" width="20" height="20" className={`${pathname === "/order" ? "text-white" : "text-[#FFCA40]"}`} />
        </li>
        <li className={`w-[56px] h-[56px] flex items-center justify-center ${pathname === "/dashboard" && "bg-[#FFCA40] rounded-[8px] shadow-[0_0_20px_0_#FFCA40]"}`}>
          <Icon icon="fluent:data-pie-20-regular" width="20" height="20" className={`${pathname === "/dashboard" ? "text-white" : "text-[#FFCA40]"}`} />
        </li>
        <li onClick={() => router.push("/menu")} className={`w-[56px] h-[56px] flex items-center justify-center ${pathname === "/menu" && "bg-[#FFCA40] rounded-[8px] shadow-[0_0_20px_0_#FFCA40]"}`}>
          <Icon icon="fluent:settings-16-regular" width="20" height="20" className={`${pathname === "/menu" ? "text-white" : "text-[#FFCA40]"}`} />
        </li>
      </ul>
      <ul className="flex flex-col items-center">
        <li className="w-[56px] h-[56px] flex items-center justify-center">
          <Icon icon="humbleicons:logout" width="20" height="20" className="text-[#FFCA40]" />
        </li>
      </ul>
    </div>
  );
}
