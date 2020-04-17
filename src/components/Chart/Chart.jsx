import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data : {confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(()=> {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData ());
        }

        fetchAPI();
    }, []);

    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['#800080', '#228B22', '#8B0000'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );
    
      const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({ date }) => date),
              datasets: [{
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#800080',
                fill: true,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: '#8B0000',
                fill: true,
              },
              ],
            }}
          />
        ) : null
      );
    
      return (
        <div className={styles.container}>
          {country ? barChart : lineChart}
        </div>
      );
    };
    
    export default Chart;
