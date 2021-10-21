import { useRTL } from '@hooks/useRTL'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { selectThemeColors } from '@utils'
import { useContext, useState } from 'react'
import Chart from 'react-apexcharts'
import Select from 'react-select'
import { Card, CardBody, CardHeader, CardTitle, Col, Label, Row } from 'reactstrap'
import ApexAreaCharts from '../charts/apex/ApexAreaCharts'
import ApexBarChart from '../charts/apex/ApexBarChart'
import ApexLineChart from '../charts/apex/ApexLineChart'

const Analysis = () => {
  const context = useContext(ThemeColors)
  const [isRtl, setIsRtl] = useRTL()
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' }
  ]
  const options = {
    labels: ['Covid', 'Heart Attacks', 'Typhoid'],
    legend: {
      show: true,
      position: 'bottom'
    },
    plotOptions: {

      radialBar: {
        hollow: {
          size: '50%'
        },
        track: {
          strokeWidth: '100%',
          margin: 10
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
            label: 'Claim Amount',
            fontSize: '1.286rem',
            colors: '#5e5873',
            fontWeight: '500',

            formatter() {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return '10 Lakh'
            }
          }
        }
      }
    },
    // colors: [context.colors.primary.main, context.colors.warning.main, context.colors.danger.main],
    colors: ['#ffc107', '#00cfe8', '#28c76f'],
    stroke: {
      lineCap: 'round'
    }
    // chart: {
    //   height: 350,
    //   dropShadow: {
    //     enabled: true,
    //     blur: 3,
    //     left: 1,
    //     top: 1,
    //     opacity: 0.1
    //   }
    // }
  }
  const series = [70, 52, 26]

  const familyWiseOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '30%',
        endingShape: 'rounded'
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Parents', 'Spouse', 'Self', 'Children']
    },
    yaxis: {
      // opposite: direction === 'rtl'
    }
  }

  const familySeries = [
    {
      data: [700, 350, 480, 600]
    }
  ]

  const ageGroupCategories = ['45 -', '30 - 45', '15 - 30', '0 - 15']

  const departmentWiseSeries = [
    {
      data: [700, 350, 680, 500, 730, 260]
    }
  ]

  const monthwiseSeries = [
    {
      data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100]
    }
  ]

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label>Policy Type</Label>
              <Select
              // isClearable={false}
              // theme={selectThemeColors}
              // className='react-select'
              // classNamePrefix='select'
              // options={roleOptions}
              // value={currentRole}
              />
            </Col>
            <Col md='4'>
              {/* <div className='d-flex align-items-center'>
                <Calendar size={14} />
                <DatePicker />
              </div> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row>
        <Col xs='12' lg='6'>
          <Card>
            <CardHeader>
              <CardTitle>
                Mostly Claimed Diseases
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Chart options={options} series={series} type='radialBar' height={350} />
            </CardBody>
          </Card>
        </Col>
        <Col xs='12' lg='6'>
          <ApexLineChart height={315} categories={['Accounts', 'Marketing', 'IT', "GST", 'Income Tax', 'Others']} inputSeries={departmentWiseSeries} title={'Department Wise Claims'} direction={isRtl ? 'rtl' : 'ltr'} warning={context.colors.warning.main} />
        </Col>
        <Col xs='12' lg='6'>
          <ApexBarChart inputOptions={familyWiseOptions} inputSeries={familySeries} title={'Family Wise Claims'}></ApexBarChart>
        </Col>
        <Col xs='12' lg='6'>
          <ApexLineChart inputSeries={monthwiseSeries} categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} title={'Monthwise Claims'} height={300} direction={isRtl ? 'rtl' : 'ltr'} warning={context.colors.primary.main} />
        </Col>
        <Col xs='12' lg='6'>
          <ApexBarChart info={context.colors.warning.main} categories={ageGroupCategories} height={350} title={'Age Groups'}></ApexBarChart>
        </Col>
        <Col xs='12' lg='6'>
          <ApexAreaCharts direction={isRtl ? 'rtl' : 'ltr'} />
        </Col>
      </Row>
    </div>
  )
}

export default Analysis