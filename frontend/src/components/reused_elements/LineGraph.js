import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

const LineGraph = () => {
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setDataPoints(data));
    }, []);

    const data = {
        labels: dataPoints.map(point => point.x),
        datasets: [
            {
                label: 'Line Graph',
                data: dataPoints.map(point => point.y),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <Line data={data} options={options} />
        </div>
    );
};

export default LineGraph;
