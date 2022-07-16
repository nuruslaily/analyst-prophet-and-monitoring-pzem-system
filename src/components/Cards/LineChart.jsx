import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; 
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ payload }) => {

    const [dataset, setDataset] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        if (payload && payload.topic) {
            console.log(payload);

            const date = new Date(Date.now()).toLocaleString();

            let array = [...dataset]; 
            let tempLabels = [...labels]

            if (array.length > 59) {
                array.splice(0, 1);
                tempLabels.splice(0, 1);

                array.push(payload.message && JSON.parse(payload.message));
                tempLabels.push(date);

                setDataset(array);
                setLabels(tempLabels);
            } else {
                setDataset(dataset => [...dataset, (payload.message && JSON.parse(payload.message))]);
                setLabels(labels => [...labels, date]);
            }
        }
    }, [payload])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Data PZEM',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Energy',
                data: dataset.map(e => e.Energy),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Current',
                data: dataset.map(e => e.Current),
                borderColor: '#34A46F',
                backgroundColor: '#3FBD82',
            },
        ],
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    );
}

export default LineChart;