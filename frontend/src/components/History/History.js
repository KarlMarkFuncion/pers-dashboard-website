// This history is a thingy. It will be a template for all of our history tabs. Both oxidation and heart rate UwU

import LineGraph from "../Dashboard/LineGraph";
import Dropdown from "./Table/Dropdown";
import Pagination from "./Table/Pagination";
import Table from "./Table/Table";

const History = () => {
    return <>

    <div className="p-5 mx-auto flex flex-col container h-fill gap-5">
        <div className="">
           <h2 className="text-md">Device History</h2>
           <h1 className="text-3xl font-bold">KM's Oxidation History</h1>
        </div>
        <LineGraph Title={"Oxidation"}/>
        <div className="grid grid-cols-2">
            <h2 className="text-md font-bold">History</h2>
            <Dropdown />
        </div>
        <Table className="" />
        <Pagination />
    </div>
    </>
}

export default History;