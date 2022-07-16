import React, { useState, useEffect } from 'react';

const Table = ({ payload }) => {
  const [dataset, setDataset] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    if (payload && payload.topic) {
      console.log(payload);

      const date = new Date(Date.now()).toLocaleString();

      let array = [...dataset];
      let tempLabels = [...labels]

      if (array.length > 9) {
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

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    tstp
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Energy
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Power
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Voltage
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Current
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Frequency
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    PF
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataset.map((e, index) => (<tr className="bg-white border-b">
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {labels[index]}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {e.Energy}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {e.Power}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {e.Voltage}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {e.Current}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {e.Frequency}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {e.PF}
                  </td>

                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;