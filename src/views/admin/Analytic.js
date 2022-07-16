import React, { useState, useEffect } from "react";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
// import ReactDOM from 'react-dom'
// import axios from 'axios'

// ReactDOM.render(
//     // <Windmill>
//     <Analytic />,
//     // {/* </Windmill>, */}
//     // document.getElementById('root')
// )

const Analytic = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     getProphet();
    // }, []);

    const getProphet = () => {
        setLoading(true)
        // toast.loading('Mengambil Data', {position: 'bottom-center'})
        axios.get("http://localhost:5000/prophet")
            .then((res) => {
                console.log(res);
                if (res.data.response === 'OK') {
                    setLoading(false);
                    toast.success('Berhasil Mengupdate Data', {position: 'bottom-center'})
                }
            }, (error) => {
                console.log(error);
            })
    } 

    return (
        <>
            <Toaster />
            <div className='pt-24'>
                <div className="flex justify-between">
                    <h1 className='text-2xl font-bold'>Analisis Menggunakan Metode Prophet</h1>
                    <button onClick={() => getProphet()}>Update Data</button>
                </div>

                {!loading &&
                    <div className="pt-8">
                        <div className="flex flex-wrap">
                            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                                <img src="http://localhost:5000/get_image_energy_consumption" alt="plot1" className="w-8/12 center" />
                            </div>
                            <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
                                <img src="http://localhost:5000/get_image_forecast" alt="forecast" className="w-8/12 center" />
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-4">
                            <div className="w-full xl:w-6/12 px-4">
                                <img src="http://localhost:5000/get_image_forecast_component" alt="forecast_component" className="w-8/12 center" />
                            </div>
                            <div className="w-full xl:w-6/12 px-4">
                                <img src="http://localhost:5000/get_image_forecast_final" alt="final" className="w-8/12 center" />
                            </div>
                            {/* <div className="w-full xl:w-6/12 px-4">
                                <img src="/final.png" alt="final" className="w-8/12 center" />
                            </div> */}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Analytic;