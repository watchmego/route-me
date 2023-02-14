import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

export const options = {
    responsive: true,
    aspectRatio: 3,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];
export const ElevationChart = () => {

    
    const [elevation, setElevation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [datanew, setData] = useState({});
    const route = useSelector(state => {console.log(state); return (state.route.points ? state.route.points : null)});


    useEffect(() => {
      console.log(route);
      if(route) {
        //console.log('chart', route);
        const data = route.coordinates.map((loc, index) => {return {x: index, y: loc[2]}});
        console.log(data);
        setElevation({
                labels: data.map((data => data[0])),
                datasets: [
                {
                    label: 'Elevation',
                    data: data
                }
                ]
        });
        setLoading(false);
        console.log('graph log',elevation)
      }
    },[data, route])


        

    return !loading ? <Line options={options} data={elevation} /> : null;
}
 