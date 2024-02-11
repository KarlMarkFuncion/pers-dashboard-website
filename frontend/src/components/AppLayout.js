import { Outlet } from "react-router-dom";
import SideBar from "./reused_elements/Sidebar/Sidebar";

const AppLayout = () => {
    return <>
    <div className="h-12 w-full pb-5">
        <SideBar />
        <Outlet />
    </div>
    </>
}

export default AppLayout;