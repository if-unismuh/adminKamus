export const pesanTemp = [
    {
        judul : "Test Judul",
        isi : "Veniam et duis amet enim ad irure sint. Incididunt nulla ad irure exercitation. Do ipsum commodo labore minim commodo aliqua aute cillum ad aute excepteur. Fugiat dolor adipisicing proident adipisicing irure aliquip deserunt et. Exercitation adipisicing ullamco Lorem sunt aute anim ex cillum nulla nostrud. Ut est commodo voluptate id.",
        momen : "Hari Ini"
    }, 
    {
        judul : "Test Judul 2",
        isi : "Veniam et duis amet enim ad irure sint. Incididunt nulla ad irure exercitation. Do ipsum commodo labore minim commodo aliqua aute cillum ad aute excepteur. Fugiat dolor adipisicing proident adipisicing irure aliquip deserunt et. Exercitation adipisicing ullamco Lorem sunt aute anim ex cillum nulla nostrud. Ut est commodo voluptate id.",
        momen : "Kemarin"
    }, 
]

export default function PesanNot({judul, momen, isi}:{judul:string, momen:string, isi:string}) {
    return(
        <div className="hover:bg-[#bebebe57] cursor-pointer py-5 flex items-center">
            <div className=" w-[70%] ml-[7%]">
                <p className="font-semibold text-ellipsis w-full overflow-hidden whitespace-nowrap max-w-full">{judul}</p>
                <p className="font-light text-sm text-[#9b9b9b] text-ellipsis w-full overflow-hidden whitespace-nowrap max-w-full">{isi}</p>
            </div>

            <p className="ml-3 text-sm text-[#bdbdbd] whitespace-wrap break-all">{momen}</p>
        </div>
    )
}