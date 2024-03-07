import { Outlet } from "react-router-dom";
// import SideBar from "./reused_elements/Sidebar/Sidebar";
import Nav from "./reused_elements/Nav/Nav";

const AppLayout = () => {
    return <>
    <Nav />
    <div className="h-12 w-full p-5 flex">
        {/* <SideBar /> */}
        <Outlet />
    </div>
    </>
}

export default AppLayout;