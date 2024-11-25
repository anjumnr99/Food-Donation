
  import {
    LineChart,
    lineElementClasses,
    markElementClasses,
  } from '@mui/x-charts/LineChart';
const Chart = () => { 
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,2100,4500,6530,1000];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300,1290,7645,3908,2353];
  const wData = [1400, 1298, 1800, 4908, 5800, 3800, 4300,3456,5420,1234,4320];
  const xLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
    return (
      <LineChart
      width={900}
      height={500}
      series={[
        { data: pData, label: 'individual', id: 'pvId' },
        { data: uData, label: 'business', id: 'uvId' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
          strokeWidth: 1,
        },
        '.MuiLineElement-series-pvId': {
          strokeDasharray: '5 5',
        },
        '.MuiLineElement-series-uvId': {
          strokeDasharray: '3 4 5 2',
        },
        '.MuiLineElement-series-wvId': {
          strokeDasharray: '3 4 5 2',
        },
        [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
          fill: '#fff',
        },
        [`& .${markElementClasses.highlighted}`]: {
          stroke: 'none',
        },
      }}
    />
    )
};

export default Chart;
