import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
import Chart from 'react-apexcharts'
import { Circle } from 'react-feather'

const CommonDiseases = props => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/card/card-analytics/product-orders').then(res => {
      console.log('asda')
      setData(res.data)
    })
  }, {
    chart_info: {}
  })

  const options = {
      labels: ['Heart Attacks', 'Covid', 'Typhoid'],
      plotOptions: {
        radialBar: {
          size: 150,
          hollow: {
            size: '20%'
          },
          track: {
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              colors: '#5e5873',
              fontWeight: '500',
              offsetY: 5
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '1.286rem',
              colors: '#5e5873',
              fontWeight: '500',

              formatter() {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 42459
              }
            }
          }
        }
      },
      colors: [props.primary, props.warning, props.danger],
      stroke: {
        lineCap: 'round'
      },
      chart: {
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      }
    },
    series = [70, 52, 26]

  return data  ? (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Common Diseases</CardTitle>
        {/* <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu right>
            {data.last_days.map(item => (
              <DropdownItem className='w-100' key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='radialBar' height={265} />
        <div className='d-flex justify-content-between mb-1'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-primary' />
            <span className='font-weight-bold ml-75'>Heart Attacks</span>
          </div>
          <span>{data.chart_info.finished}</span>
        </div>
        <div className='d-flex justify-content-between mb-1'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-warning' />
            <span className='font-weight-bold ml-75'>Covid</span>
          </div>
          <span>{data.chart_info.pending}</span>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-danger' />
            <span className='font-weight-bold ml-75'>Typhoid</span>
          </div>
          <span>{data.chart_info.rejected}</span>
        </div>
      </CardBody>
    </Card>
  ) : <Fragment></Fragment>
}
export default CommonDiseases
