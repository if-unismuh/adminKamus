import { useEffect, useState } from "react";
import NavItem from "../../NavItems";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { profileItems } from "./profileItems";
import ProfileItem from "./ProfileItems";
import useDropDownCore from "../../../Hook/dropDown";
import SettingsIcon from '@mui/icons-material/Settings';


export default function DropBoxNav({ setActive }: { setActive: any }) {
  const preExit = useDropDownCore("dropNav")
  return (
    <div
      onAnimationEnd={() => {
        if (!preExit) return;
        setActive(false);
      }}
      className={`absolute animate__animated ${
        preExit ? "animate__fadeOutRight" : "animate__fadeInRight"
      } cursor-default rounded-md shadow-md right-0 top-[110%] w-[50%] min-h-full bg-white `}
    >
      <div className="my-[1rem]">
        <div className="mx-[1rem]  flex gap-[0.5rem] items-center">
          <div className="relative w-[2.5rem] h-[2.5rem] bg-red-500 rounded-full">
            <img
              src="/whatsapp.jpg"
              alt=""
              className="w-full h-full  rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-md">Test</p>
            <p className="text-[#696969] text-sm">Admin</p>
          </div>
        </div>
        <hr className="mt-[5%] border-[1px]" />
        
        <div className="mx-[.5rem] my-3 flex gap-[4%]">
           {
            profileItems.map((el,ind) => (
                <ProfileItem key={ind+"-"+el.label+"drop"} path={el.path} Icon={el.Icon} label={el.label} />
            ))
           }
        </div>
        <hr className="mt-[5%] border-[1px]" />
        <div className="mx-[.5rem] my-3 flex gap-[4%]">
            <ProfileItem path={"/settings"} Icon={SettingsIcon} label={"Setting"} />
            
        </div>
        <hr className="mt-[5%] border-[1px]" />
        <div className="mx-[.5rem] my-3 flex gap-[4%]">
            <ProfileItem path={"/login"} Icon={ExitToAppOutlinedIcon} label={"Log Out"} />
            
        </div>
      </div>
    </div>
  );
}

