import { FC, ReactElement } from "react"
import { Bar } from 'react-chartjs-2';
import { useState } from 'react'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js'; 
import style from './BarChart.module.css'

// Регистрация необходимых компонентов 
ChartJS.register( 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
  ); 

  interface TypeProps  {
    data: Array<number>
  }

  const BarChart: FC<TypeProps> = (props): ReactElement => {
    const [dataTime, _setDataTime] = useState(Object.values(props.data))
    const dataChart = {
      labels: ['Python', 'Java', 'C++', 'JavaScript'],
      datasets: [
        {
          label: 'Скорость',
          data: dataTime,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
        scales: {
          x: {
            // Дополнительные опции для оси x, если необходимо
          },
          // Опции для оси y, если необходимо
        },
      };
  
    return (
      <div>
        <h2 className={style["BarChart__h2"]}>Скорость выполнения программ</h2>
        <div>
            <Bar data={dataChart} options={options}/>
        </div>
      </div>
    );
  };
  
  export default BarChart;
  
