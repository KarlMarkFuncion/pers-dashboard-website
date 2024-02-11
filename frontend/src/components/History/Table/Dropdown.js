import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
   
  const Dropdown = ({ menu_options, setTimeFrame }) => {

    menu_options = ["Last hour", "Last 2 hours", "Last 3 hours", "Last 6 hours", "Past 12 hours", "Past 24 hours"]
    
    // Timeframe will be the function that changes the useState of the website to show the changed state of the table according to the set time.
    setTimeFrame = null;

    return (
      <Menu>
        <MenuHandler>
          <Button>Menu</Button>
        </MenuHandler>
        <MenuList>
            {
                menu_options.map((item, index) => {
                return <MenuItem key={index}>{item}</MenuItem>
                })
            }
        </MenuList>
      </Menu>
    );
  }

export default Dropdown;