import MostSearch from "./MostSearch"
export default function Dashboard() {
    document.title = "Dashboard"
    return(
        <div className=" w-full min-h-[100vh]">
            <div className="mx-5 py-5">
                <MostSearch/>
            </div>
        </div>
    )
}

