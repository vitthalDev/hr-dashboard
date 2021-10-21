import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Fragment, useContext, useState } from "react"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"
import { Bar } from 'react-chartjs-2'
import ApexBarChart from '../charts/apex/ApexBarChart'
import Chart from 'react-apexcharts'
import LineChart from '../charts/recharts/LineChart'

const ClaimAnalysis3 = () => {
    const { colors } = useContext(ThemeColors)
    const tooltipShadow = 'rgba(0, 0, 0, 0.25)',
        labelColor = '#6e6b7b',
        gridLineColor = 'rgba(200, 200, 200, 0.2)',
        lineChartPrimary = '#666ee8',
        lineChartDanger = '#ff4961',
        warningColorShade = '#ffe802',
        warningLightColor = '#FDAC34',
        successColorShade = '#28dac6',
        primaryColorShade = '#836AF9',
        infoColorShade = '#299AFF',
        yellowColor = '#ffe800',
        greyColor = '#4F5D70',
        blueColor = '#2c9aff',
        blueLightColor = '#84D0FF',
        greyLightColor = '#EDF1F4'

    const statusWiseGridColumns = [
        { name: 'CLAIM STATUS', selector: 'status', sortable: true },
        { name: 'NO. OF CLAIMS', selector: 'noOfClaims', sortable: true, center: true },
        {
            name: 'CLAIM COST',
            selector: 'cost',
            sortable: true,
            style: { 'justify-content': 'end' },
            cell: (row) => (
                <Row className='justify-content-end w-50'>
                    <div>{row.cost}</div>
                </Row>
            )
        }
    ]

    const ratioData = {
        labels: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12', '17/12'],
        datasets: [
            {
                data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
                backgroundColor: successColorShade,
                borderColor: 'transparent',
                barThickness: 15
            }
        ]
    }

    const options = {
        elements: {
            rectangle: {
                borderWidth: 2,
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
            display: false
        },
        tooltips: {
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: tooltipShadow,
            backgroundColor: '#fff',
            titleFontColor: '#000',
            bodyFontColor: '#000'
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: true,
                        color: gridLineColor,
                        zeroLineColor: gridLineColor
                    },
                    scaleLabel: {
                        display: false
                    },
                    ticks: {
                        fontColor: labelColor
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        color: gridLineColor,
                        zeroLineColor: gridLineColor
                    },
                    ticks: {
                        stepSize: 100,
                        min: 0,
                        max: 400,
                        fontColor: labelColor
                    }
                }
            ]
        }
    }

    const [incidenceRatioProjection, setIncidenceRatioProjection] = useState(
        [
            { relation: "Employee", currentMembers1: '668', currentMembers2: '10', eopClaims: '38', currentIncidence: '1%', claimCost: '5%' },
            { relation: "Spouse", currentMembers1: '533', currentMembers2: '18', eopClaims: '68', currentIncidence: '3%', claimCost: '12%' },
            { relation: "Child", currentMembers1: '699', currentMembers2: '0', eopClaims: '0', currentIncidence: '0%', claimCost: '0%' },
            { relation: "Parent", currentMembers1: '973', currentMembers2: '20', eopClaims: '76', currentIncidence: '2%', claimCost: '7%' },
            { relation: "Grand Total", currentMembers1: '2873', currentMembers2: '48', eopClaims: '183', currentIncidence: '2%', claimCost: '6%' }
        ])

    const incidenceRatioProjectionColumns = [
        { name: 'RELATION', sortable: true, selector: 'relation' },
        { name: 'CURRENT MEMBERS', sortable: true, selector: 'currentMembers1' },
        { name: 'CURRENT MEMBERS', sortable: true, selector: 'currentMembers2' },
        { name: 'EOP CLAIMS', sortable: true, selector: 'eopClaims' },
        { name: 'CURRENT INCIDENCE', sortable: true, selector: 'currentIncidence' },
        { name: 'CLAIM COST', sortable: true, selector: 'claimCost' }
    ]

    const [statusWiseGridData, setStatusWiseGridData] = useState([
        // { status: 'Settled', noOfClaims: '20', cost: '11111' },
        { status: 'Reimbursement', noOfClaims: '20', cost: '222,222' },
        { status: 'Cashless', noOfClaims: '14', cost: '333,333' },
        // { status: 'Rejected', noOfClaims: '08', cost: '444444' },
        { status: 'Grand Total', noOfClaims: '52', cost: '555,555' }
    ])

    const series5Column = [
        {
            name: 'Z India Pvt Ltd',
            data: [90, 120, 55, 100, 80, 50]
        },
        {
            name: 'Industry',
            data: [85, 100, 30, 40, 95, 100]
        }
    ]

    const series2Column = [
        {
            name: 'Z India Pvt Ltd',
            data: [90, 120]
        },
        {
            name: 'Industry',
            data: [85, 100]
        }
    ]

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
                barHeight: '20%',
                horizontal: true,
                colors: {
                    backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
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
            categories: [
                '100k and above',
                '75k to below 100k',
                '50k to below 75k',
                '25k to below 50k',
                '10k to below 25k',
                '<10K'
            ]
        },
        fill: {
            opacity: 1
        }
    }
    const averageClaimChartOptions2Column = {
        chart: {
            type: 'bar',
            stacked: true,
            parentHeightOffset: 0,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '20%',
                colors: {
                    backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
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
            categories: ['Reimbursement', 'Cashless']
        },
        fill: {
            opacity: 1
        }
    }

    const bandWiseClaimColumns = [
        { name: 'AMOUNT BAND', selector: 'band', sortable: false },
        { name: 'NO. OF CLAIMS', selector: 'noOfClaims', sortable: true, center: true },
        {
            name: 'CLAIM COST',
            selector: 'cost',
            sortable: true,
            style: { 'justify-content': 'end' },
            cell: (row) => (
                <Row className='justify-content-end w-50'>
                    <div>{row.cost}</div>
                </Row>
            )
        }

    ]
    const [bandWiseClaimData, setBandWiseClaimsData] = useState(

        [
            { band: "<10K", noOfClaims: '6', cost: '40,921' },
            { band: "10K to Below 25K", noOfClaims: '13', cost: '198,334' },
            { band: "25K to Below 50K", noOfClaims: '18', cost: '597,346' },
            { band: "50K to Below 75K", noOfClaims: '4', cost: '249,222' },
            { band: "75K to Below 100K", noOfClaims: '3', cost: '226,072' },
            { band: "100K to Below 150K", noOfClaims: '2', cost: '260,292' },
            { band: "150K to Below 200K", noOfClaims: '2', cost: '704,321' },
            { band: "Grand Total", noOfClaims: '48', cost: '1,909,138' }
        ]
    )
    return (
        <Fragment >
            <Row className='claim-analytics'>
                <Col xs='12' lg='6'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h3'>
                                Relationship wise Claim Analysis
                            </CardTitle>
                        </CardHeader>
                        <DataTable
                            noHeader
                            data={statusWiseGridData}
                            columns={statusWiseGridColumns}
                            className='react-dataTable relationship-table mb-2'
                            sortIcon={<ChevronDown size={10} />}
                        />
                    </Card>
                </Col>

                <Col xs='12' lg='6'>
                    <Card>
                        <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
                            <CardTitle tag='h4'>Average of claim cost</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Chart options={averageClaimChartOptions2Column} series={series2Column} type='bar' height={200} />
                        </CardBody>
                    </Card>
                </Col>
                <Col xs='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Notes
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                <li>Overall cashless claims account for 38% of the total claim cost for Heinz India Pvt. Ltd. This is below industry. </li>
                                <li>Average claim cost for cashless claims is below industry and reimbursement claims is above industry. </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg='6' xs='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h3'>
                                Status Wise Claim Summary & Claim Ratios
                            </CardTitle>
                        </CardHeader>
                        <DataTable
                            noHeader
                            data={bandWiseClaimData}
                            columns={bandWiseClaimColumns}
                            className='react-dataTable table-striped bandwise-table mb-2'
                            sortIcon={<ChevronDown size={10} />}
                        />
                    </Card>
                </Col>
                <Col xs='12' lg='6'>
                    <Card>
                        <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
                            <CardTitle tag='h4'>Average of claim cost</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Chart options={averageClaimChartOptions} series={series5Column} type='bar' height={350} />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Notes
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                <li>Most of the claims reported are in below 50K amount band. </li>
                                <li>For Average claim cost, only settled claims are considered. </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment >
    )
}

export default ClaimAnalysis3