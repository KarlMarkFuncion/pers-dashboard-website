import {ListItem, ListItemPrefix} from "@material-tailwind/react"
import { Link } from "react-router-dom"

const PersDeviceLink = () => {
    return(<>

    <Link to="">
        <ListItem>
            <ListItemPrefix>
              <img src="https://picsum.photos/60/60" className="rounded-full h-4/6" alt="patient_profile_picture" />
            </ListItemPrefix>
            Eeya's Pers
        </ListItem>
    </Link>
    </>)
}

export default PersDeviceLink