import { Link,} from "react-router-dom"
import { ListItemPrefix, ListItem }  from "@material-tailwind/react"
const PersLink = ({name, pers_id, profile_pic}) => {
    return <ListItem>
        <ListItemPrefix>
          <img src={profile_pic ? `profile_pic` : "https://picsum.photos/60/60" } className="rounded-full h-4/6" alt="patient_profile_picture" />
        </ListItemPrefix>
        <Link to={`/getUserById/${pers_id}`}>
          {name}'s Pers
        </Link>
    </ListItem>
}

export default PersLink;