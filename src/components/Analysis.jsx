// Component for analyzing investments
    import React from 'react';
    import { Bar } from 'react-chartjs-2';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    function Analysis() {
      const data = {
        labels: ['ERC-20', 'ERC-1155'],
        datasets: [
          {
            label: 'Investment',
            data: [100, 50],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Investment Analysis',
          },
        },
      };

      return (
        <div>
          <h2>Analysis</h2>
          <Bar data={data} options={options} />
        </div>
      );
    }

    export default Analysis;
