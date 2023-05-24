import { NavItems } from "./navItem";
import NavItem from "../NavItems";
export default function Sidebar() {
  return (
    <div className="w-[21vw] h-[100vh] fixed top-0 left-0 bg-white shadow-lg z-[1]">
      <div className="ml-[7%] mr-[5%] mt-[5%] flex flex-col">
        <h1 className="text-2xl font-semibold">Admin</h1>

        <div className="mt-[4vh] flex flex-col gap-[2vh]">
          {NavItems.map((el, ind) => (
            <NavItem
              path={el.path}
              label={el.label}
              key={ind + "-id-" + el.label}
              Icon={el.icon[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

