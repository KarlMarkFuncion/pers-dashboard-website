import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
   
  // If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
  // import dynamic from "next/dynamic";
  // const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
   
  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "BPM",

        // Add custom increment
        data: [80, 82, 93, 80, 93, 91, 89, 87, 84],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "11:00",
          "11:10",
          "11:20",
          "11:30",
          "11:40",
          "11:50",
          "12:00",
          "12:10",
          "12:20",
          "12:30",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
   

const LineGraph = ({Title, Data, Status, Icon}) => {
    return (
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div className="grid grid-cols-2 w-full">
            <div>
                <Typography variant="h6" color="blue-gray">
                {Title} Timeline
                </Typography>

                { Status ?
                <Typography
                variant="small"
                color="gray"h
                className="max-w-sm font-normal"
                >
                Current status is {Status}
                </Typography> : <></>}
            </div>
            <a href="/" className="w-full underline text-right">history</a>
            
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    );
  }

export default LineGraph;