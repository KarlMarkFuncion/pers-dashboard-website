import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Name", "Date", "Time", "Location", "Oxidation level", "Status"];
 
const TABLE_ROWS = [
  // Make this a graph of rows taken every 5 seconds.
  {
    name: "KM Funcion",
    date: "23/04/18",
    time: "13:00",
    location: "39.16080259994052, -83.09136734680673",
    oxidation_level: "95%",
    status: "normal"
  },
  {
    name: "KM Funcion",
    date: "23/04/18",
    time: "13:00",
    location: "39.16080259994052, -83.09136734680673",
    oxidation_level: "95%",
    status: "normal"
  },
  {
    name: "KM Funcion",
    date: "23/04/18",
    time: "13:00",
    location: "39.16080259994052, -83.09136734680673",
    oxidation_level: "95%",
    status: "normal"
  },
  {
    name: "KM Funcion",
    date: "23/04/18",
    time: "13:00",
    location: "39.16080259994052, -83.09136734680673",
    oxidation_level: "95%",
    status: "normal"
  },
  {
    name: "KM Funcion",
    date: "23/04/18",
    time: "13:00",
    location: "39.16080259994052, -83.09136734680673",
    oxidation_level: "95%",
    status: "normal"
  },
];


const Table = () => {
    return <>
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, date, time, location, oxidation_level, status }, index) => (
            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {date}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {time}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {location}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {oxidation_level}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {status}  
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </>
}

export default Table;