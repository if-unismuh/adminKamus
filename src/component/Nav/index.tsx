import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useEffect, useState } from "react";
import DropBoxNav from "./Profile/ProfileBox";
import NotificationDrop from "./Notification";
export default function Nav() {
  const [profile, setProfile] = useState(false);
  const [notification, setNotification] = useState(false)
  useEffect(() => {
    console.log(profile)
    if(profile || notification) {
      document.body.classList.add("scroll-lock")
    } else {
      document.body.classList.remove("scroll-lock")
    }
  }, [profile, notification])
  
  return (
    <>
      <div className="sticky top-0 left-0 w-full h-[12vh] pt-[2vh] backdrop-blur-sm z-[999]">
        <div className="ml-auto mr-auto w-[96%] h-[10vh]  rounded-md bg-white shadow-sm">
          <div className="flex ml-[2rem] mr-[2rem] items-center max-w-full h-full">
            <p>
              <SearchIcon sx={{ fontSize: "25px" }} />{" "}
            </p>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="ml-[1rem] focu focus:outline-[0] w-[45%]"
            />
            <div className="flex relative justify-end w-[50%] h-full items-center gap-[1vw] ">
              <p className="relative hover:cursor-pointer" onClick={() => {
                setNotification(true)
              }}>
                <NotificationsNoneOutlinedIcon />
                  <span className="absolute top-0 right-0  animate-ping inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                  <span className="absolute top-0 right-0 inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </p>
              <div
                onClick={() => {
                  setProfile(true);
                }}
                className="relative w-[2.5rem] h-[2.5rem] bg-red-500 rounded-full cursor-pointer"
              >
                <img
                  src="/whatsapp.jpg"
                  alt=""
                  className="w-full h-full  rounded-full"
                />
              </div>
              {
                profile ? 
                <DropBoxNav setActive={setProfile} />
                : <></>
              }
              {
                notification ? 
                <NotificationDrop setActive={setNotification} /> : <></>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


