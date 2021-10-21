import { useEffect, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
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
import * as Icon from 'react-feather'

const ActiveAdmissions = props => {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        axios.get('/card/card-analytics/sessions-device').then(res => setData(res.data))
    }, [])
    
    const series = [50, 10, 5, 30]
    const options = {
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true
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
        labels: ['Employees', 'Spouse', 'Children', 'Parents'],
        dataLabels: {
            enabled: true,
            formatter(val, opt) {
                
                return series[opt.seriesIndex]
            }
        },

        legend: { show: false },
        comparedResult: [2, 3, 5, 8],
        stroke: { width: 0 },
        colors: [props.primary, props.warning, props.danger, props.success]
    }

    const renderChartInfo = () => {
        return data.chart_info.map((item, index) => {
            const IconTag = Icon[item.icon]
            return (
                <div
                    key={index}
                    className={classnames('d-flex justify-content-between', {
                        'mb-1': index !== data.chart_info.length - 1
                    })}
                >
                    <div className='d-flex align-items-center'>
                        <IconTag
                            size={17}
                            className={classnames({
                                [item.iconColor]: item.iconColor
                            })}
                        />
                        <span className='font-weight-bold ml-75 mr-25'>{item.name}</span>
                        {/* <span>- {item.usage}</span> */}
                    </div>
                    <div>
                        <span>{item.usage}</span>
                        {/* {item.upDown > 0 ? ( */}
                        {/* <Icon.ArrowUp size={14} className='ml-25 text-success' /> */}
                        {/* ) : ( */}
                        {/* <Icon.ArrowDown size={14} className='ml-25 text-danger' /> */}
                        {/* )} */}
                    </div>
                </div>
            )
        })
    }

    return data !== null ? (
        <Card className='p-sm-25'>
            <CardHeader className='align-items-end'>
                <CardTitle tag='h4'>Active Admissions</CardTitle>
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
                <Chart options={options} series={series} type='donut' height={250} />
                {renderChartInfo()}
            </CardBody>
        </Card>
    ) : null
}
export default ActiveAdmissions
