import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import delayImport from "../../../util/delay";

const fakeDb = [
  {
    kata: "Aruh",
    jumlah: 20,
  },
  {
    kata: "Dunia",
    jumlah: 22,
  },
];

export default function MostSearch() {
  const [katas, setKatas] = useState<Array<any>>();
  useEffect(() => {
    getKatas();
  });
  async function getKatas() {
    const promiseItem = await delayImport(2000, fakeDb);
    setKatas(promiseItem);
  }
  return (
    <div className="w-[300px] min-h-[400px] bg-white rounded-md shadow-md">
      <div className="px-5 py-5">
        <p className="font-thin text-lg">Kata yang sering dicari</p>
        <p className="text-[#a1a1a1]">Bulan Ini</p>
        <div className="flex flex-col gap-2 my-4">
          {katas?.map((el: any) => (
            <Item {...el} />
          ))}
          {katas == null ? (
            <>
              <Skeleton sx={{fontSize:"x-large"}} /> 
              <Skeleton sx={{fontSize:"x-large"}} />
              <Skeleton sx={{fontSize:"x-large"}} />
              <Skeleton sx={{fontSize:"x-large"}} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

function Item({ kata, jumlah }: { kata: string; jumlah: number }) {
  return (
    <div className="flex py-1 justify-between ">
      <div className="ml-[10%] w-[50%] max-w-full">
        <p className="font-semibold text-lg">{kata}</p>
      </div>
      <p className="text-[#a1a1a1]">{jumlah}x</p>
    </div>
  );
}
