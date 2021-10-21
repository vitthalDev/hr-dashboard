import Chart from 'react-apexcharts'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"
import InvoiceList from '../apps/invoice/list'
import ClaimsGrid from './claimsGrid'
import FilterPanel from "./filterPanel"

const PastClaims = (props) => {
  const columnColors = {
    series1: '#826af9',
    series2: '#d2b0ff',
    bg: '#f8d3ff'
  }

  const averageClaimChartOptions = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
          backgroundBarRadius: 10
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start'
    },
    colors: [columnColors.series1, columnColors.series2],
    stroke: {
      show: true,
      colors: ['transparent']
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    fill: {
      opacity: 1
    }
  }

  const series = [
    {
      name: 'Cashless',
      data: [90, 120, 55, 100, 80, 90, 120, 55, 100, 80, 90, 120]
    },
    {
      name: 'Reimbursement',
      data: [85, 100, 30, 40, 95, 85, 100, 30, 40, 95, 85, 100]
    }
  ]

  const options = {
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Claim Amount',
              formatter: (w) => {
                return `${w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)} Lakh`
              }
            }
          }
        }
      }
    },
    chart: {
      toolbar: {
        show: false
      }
    },

    labels: ['Hospitalization', 'Medicine', 'Maternity', 'Pathology'],
    dataLabels: {
      enabled: false
      // formatter(val, opt) {
      //     return `${parseInt(val)}`
      // }
    },

    legend: { show: true, position: 'bottom' },
    stroke: { width: 0 },
    colors: [props.primary, columnColors.series1, columnColors.series2, columnColors.bg]
  }
  const donutSeries = [3, 5, 7, 10]

  return (
    <div>
      <FilterPanel></FilterPanel>
      <Row>
        <Col xs='12' lg='6'>
          <Card>
            <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
              <CardTitle tag='h4'>Cashless vs Reimbursement Claims</CardTitle>
            </CardHeader>
            <CardBody>
              <Chart options={averageClaimChartOptions} series={series} type='bar' height={300} />
            </CardBody>
          </Card>
        </Col>
        <Col sm='12' lg='6'>
          <Card>
            <CardHeader className='align-items-end'>
              <CardTitle>
                Top Benefits Utilized
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Chart options={options} series={donutSeries} type='donut' height={320} />
            </CardBody>
          </Card>
        </Col>
        <Col sm='12'>
          <ClaimsGrid title='Past Claims' isPastClaim={true}/>
        </Col>
      </Row>
    </div>
  )
}

export default PastClaims