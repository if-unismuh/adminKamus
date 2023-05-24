import { useEffect, useState } from "react";
import useDropDownCore from "../../../Hook/dropDown";
import PesanNot, { pesanTemp } from "./pesanNotification";

export default function NotificationDrop({ setActive }: { setActive: any }) {
  const preExit = useDropDownCore("notificationDrop");
  return (
    <div
      id="notificationDrop"
      onAnimationEnd={() => {
        if (!preExit) return;
        setActive(false);
      }}
      className={`absolute animate__animated ${
        preExit ? "animate__fadeOutRight" : "animate__fadeInRight"
      }  top-[110%] right-[15%] w-[80%] min-h-full bg-white rounded-md`}
    >
      <div className="my-[1rem] mx-5 flex justify-between items-center">
        <p className="font-semibold text-lg text-[#4D4B55]">Notifikasi</p>
        <span className="text-[.8rem] font-semibold text-[rgb(49,132,215)] bg-[rgba(49,132,215,0.35)] px-1 rounded-full">
          2 Pesan
        </span>
      </div>
      <hr className="mt-[5%] border-[1px]" />
      <div className="flex flex-col gap-3">
        {
          pesanTemp.map(el => (
            <PesanNot {...el} />
          ))
        }
      </div>
    </div>
  );
}
