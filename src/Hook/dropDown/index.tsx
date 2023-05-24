import { useEffect, useState } from "react";

export default function useDropDownCore(id:string) {
    const [preExit, setPreExit] = useState(false)
    useEffect(() => {
        // add event listener to document to listen for clicks
        document.addEventListener("mousedown", handleClickOutside);
    
        // cleanup function to remove event listener when component unmounts
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event: any) => {
          const ref = document.getElementById(id);
            console.log(id)
        if (!ref?.contains(event.target)) {
            setPreExit(true)
        }
      };
      return preExit
}