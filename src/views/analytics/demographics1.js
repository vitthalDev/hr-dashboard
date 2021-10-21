import Chart from 'react-apexcharts'
import { Fragment, useState } from "react"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"

const GenderGraphTile = (props) => {
    const options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        labels: ['Male', 'Female'],

        dataLabels: {
            enabled: false
        },
        legend: { show: false, position: 'left' },
        stroke: { width: 0 },
        colors: [props.primary, props.warning]
    }
    return (
        <Row className='my-25'>
            <Col xs='12'>
                <Row className='justify-content-center'>
                    <Col xs='4'>
                        <Row>


                            <Col xs='12'  className='p-0'>
                                {props.category}
                            </Col>
                            <Col xs='6'  className='p-0'>
                                <span className='bullet square mr-50' style={{ backgroundColor: props.primary }} ></span>
                                <span>
                                    Male
                                </span>
                            </Col>
                            <Col xs='6'>{props.males}%</Col>
                            <Col xs='6' className='p-0'>
                                <span className='bullet square mr-50' style={{ backgroundColor: props.warning }} ></span>
                                <span>
                                    Female
                                </span>
                            </Col>
                            <Col xs='6'>{100 - props.males}%</Col>
                        </Row>
                    </Col>
                    <Col xs='2' >
                        <Chart options={options} series={[props.males, 100 - props.males]} type='donut' height={95} />
                    </Col>
                </Row>
            </Col>
        </Row >
    )
}


const Demographics1 = (props) => {
    const [data, setData] = useState(
        [
            { relationship: "Employee", currentMembers: '668', inceptionMembers: '647', percent: '3%' },
            { relationship: "Spouse", currentMembers: '533', inceptionMembers: '520', percent: '3%' },
            { relationship: "Children", currentMembers: '699', inceptionMembers: '687', percent: '2%' },
            { relationship: "Parent", currentMembers: '973', inceptionMembers: '920', percent: '6%' },
            { relationship: "Grand Total", currentMembers: '2,873', inceptionMembers: '2,774', percent: '14%' }
        ])
    const coveredMembersColumns = [
        { name: 'RELATIONSHIP', selector: 'relationship', sortable: true, minWidth: '150px' },
        { name: 'CURRENT MEMBERS', selector: 'currentMembers', sortable: true, center: true, minWidth: '150px' },
        { name: 'INCEPTION MEMBERS', selector: 'inceptionMembers', sortable: true, center: true, minWidth: '150px' },
        { name: '%', selector: 'percent', sortable: true, minWidth: '50px' }
    ]
    const genderWiseMembersColumns = [
        { name: 'RELATIONSHIP', selector: 'relationship', sortable: true, minWidth: '150px' },
        { name: 'MALE', selector: 'currentMembers', sortable: true, center: true, minWidth: '100px' },
        { name: 'FEMALE', selector: 'inceptionMembers', sortable: true, center: true, minWidth: '100px' },
        { name: '%', selector: 'percent', sortable: true, minWidth: '50px' }
    ]

    const options = {
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: false
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
        labels: ['Employees', 'Spouse', 'Children', 'Parent'],
        dataLabels: {
            enabled: true
            // formatter(val, opt) {
            //     return `${parseInt(val)}`
            // }
        },

        legend: { show: true, position: 'bottom' },
        stroke: { width: 0 },
        colors: [props.colors.primary.main, '#00cfe8', props.colors.danger.main, props.colors.warning.main]
    },
        series = [3, 5, 7, 10]


    return (
        <Fragment>
            <Row>
                <Col xs='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h3'>
                                Composition of covered members
                            </CardTitle>
                        </CardHeader>
                        {/* <CardBody> */}

                        <Row>
                            <Col lg='6'>

                                <DataTable
                                    noHeader
                                    data={data}
                                    columns={coveredMembersColumns}
                                    className='react-dataTable'
                                    sortIcon={<ChevronDown size={10} />}
                                />
                            </Col>
                            <Col lg='6'>

                                {/* </CardBody> */}
                                <Chart options={options} series={series} type='donut' height={320} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs='12' lg='6'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h3'>
                                Gender Wise Composition of covered members
                            </CardTitle>
                        </CardHeader>
                        {/* <CardBody className='p-2'> */}

                        <DataTable
                            noHeader
                            data={data}
                            columns={genderWiseMembersColumns}
                            className='react-dataTable'
                            sortIcon={<ChevronDown size={10} />}
                        />
                        {/* </CardBody> */}
                    </Card>
                </Col>

                <Col xs='12' lg='6'>
                    <Card>
                        <CardBody>
                            <GenderGraphTile males={66} category='Employees' primary={props.colors.primary.main} warning={props.colors.primary.lighter}></GenderGraphTile>
                            <GenderGraphTile males={24} category='Spouse' primary={props.colors.cyan.main} warning={props.colors.blue.main}></GenderGraphTile>
                            <GenderGraphTile males={42} category='Children' primary={props.colors.danger.main} warning={props.colors.danger.lighter}></GenderGraphTile>
                            <GenderGraphTile males={59} category='Parent' primary={props.colors.warning.main} warning={props.colors.warning.lighter}></GenderGraphTile>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}
export default Demographics1