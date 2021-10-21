import Chart from 'react-apexcharts'
import { Settings } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, CardSubtitle } from 'reactstrap'
import { PolicyTiles } from './policyTiles'

const Policies = props => {
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      type: 'line',
      dropShadow: {
        enabled: true,
        top: 18,
        left: 2,
        blur: 5,
        opacity: 0.2
      },
      offsetX: -10
    },
    stroke: {
      curve: 'smooth',
      width: 4
    },
    grid: {
      borderColor: '#ebe9f1',
      padding: {
        top: -20,
        bottom: 5,
        left: 20
      }
    },
    legend: {
      show: false
    },
    colors: ['#df87f2', '#eb3411'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        inverseColors: false,
        gradientToColors: [props.primary],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 5
      }
    },
    xaxis: {
      labels: {
        offsetY: 5,
        style: {
          colors: '#b9b9c3',
          fontSize: '0.857rem',
          fontFamily: 'Montserrat'
        }
      },
      axisTicks: {
        show: false
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false
      },
      tickPlacement: 'on'
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.857rem',
          fontFamily: 'Montserrat'
        },
        formatter(val) {
          return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
        }
      }
    },
    tooltip: {
      x: { show: false }
    }
  },
    series = [
      {
        name: 'Family Floater Plan',
        data: [140, 180, 150, 205, 160, 295, 125, 255, 205, 305, 240, 295]
      },
      {
        name: 'Joint Health insurance',
        data: [150, 160, 170, 195, 150, 245, 215, 275, 285, 315, 220, 205]
      }
    ]

  return (
    <Card>
      <CardHeader className='align-items-start'>
        <CardTitle className='mb-25' tag='h4' >
          Policies
        </CardTitle>
        <Row className='col-md-12 p-0'>
          <Col lg='3'>
            <PolicyTiles heading="Policy plan 1" color1="#28c76f" color2="#28c76faa" maleCount={20} femaleCount={40} />
          </Col>
          <Col lg='3'>
            <PolicyTiles heading="Policy plan 2" color1="#ff9f43" color2="#ff9f43aa" maleCount={20} femaleCount={40} />
          </Col>
          <Col lg='3'>
            <PolicyTiles heading="Policy plan 3" color1="#7367f0" color2="#7367f0aa" maleCount={20} femaleCount={40} />
          </Col>
          <Col lg='3'>
            <PolicyTiles heading="Policy plan 4" color1="#ea5455" color2="#ea5455aa" maleCount={20} femaleCount={40} />
          </Col>
        </Row>
        <div className='d-flex justify-content-around pt-1'>

          <CardTitle> Policy Usage </CardTitle>
          <CardSubtitle className='mt-0'>

            <span className='ml-5 mr-2'> <i className='circle bg-red m-r-2p'></i> Family Floater Plan</span>
            <span> <i className='circle bg-green m-r-2p'></i> Joint Health insurance</span>
          </CardSubtitle>
        </div>
      </CardHeader>
      <CardBody className='pb-0'>
        <Chart options={options} series={series} type='line' height={255} />
      </CardBody>
    </Card>
  )
}
export default Policies