import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon, 
  InboxIcon, 
} from "@heroicons/react/24/solid";

import { useEffect } from "react";
import axios from "axios";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AddDevice from "./AddDevice"; 
import PersLink from "./PersLink";
import useStore from "../../../store/useStore";
 
export default function SideBar() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const { persDevices, setPersDevices, currentUser } = useStore();

  useEffect(() => {
    const fetchCurrentListing = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}find_listing/${currentUser.id}`
        );
        setPersDevices(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchCurrentListing();
  }, [setPersDevices, currentUser.id]);

  return <>
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4  drop-shadow-none shadow-none rounded-none h-full">
      <div className="my-2">
        <AddDevice />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Devices
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              { persDevices.map( device => {
                return <PersLink name={device.patient_name} pers_id={device.id}  />
              })}
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
      </List>
    </Card>
  </>
}