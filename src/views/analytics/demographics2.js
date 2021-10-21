import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Fragment, useContext, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"
import ApexBarChart from '../charts/apex/ApexBarChart'
import ApexLineChart from '../charts/apex/ApexLineChart'
import LineChart from '../charts/recharts/LineChart'
import DemographicSpouseRatio from './demographicSpouseRatio'

const Demographics2 = (props) => {
    const { colors } = useContext(ThemeColors)
    const [data, setData] = useState(
        [
            { id: '0-18 Years', full_name: 1, email: 5, post: 517, age: '-', salary: 523 },
            { id: '9-25 Years', full_name: 63, email: 52, post: 182, age: '-', salary: 297 },
            { id: '26-35 Years', full_name: 270, email: 203, post: '-', age: '-', salary: 473 },
            { id: '36-45 Years', full_name: 116, email: 130, post: '-', age: 119, salary: 265 },
            { id: '45-55 Years', full_name: 157, email: 115, post: '-', age: 269, salary: 541 },
            { id: '56-65 Years', full_name: 61, email: 28, post: '-', age: 393, salary: 482 },
            { id: '66-70 Years', full_name: '-', email: '-', post: '-', age: 105, salary: 105 },
            { id: '71-75 Years', full_name: '-', email: '-', post: '-', age: 103, salary: 103 },
            { id: '78-79 Years', full_name: '-', email: '-', post: '-', age: 41, salary: 41 },
            { id: '80 Years & Above', full_name: '-', email: '-', post: '-', age: 43, salary: 43 },
            { id: 'Grand Total', full_name: 668, email: 533, post: 699, age: 973, salary: '2,873' }
        ]
    )

    const compositionColumns = [
        {
            name: 'AGE BAND',
            selector: 'id',
            sortable: true
            // maxWidth: '100px'
        },
        {
            name: 'EMPLOYEE',
            selector: 'full_name',
            sortable: true,
            center: true
            // ,
            // minWidth: '225px'
        },
        {
            name: 'SPOUSE',
            selector: 'email',
            sortable: true,
            center: true
            // ,
            // minWidth: '310px'
        },
        {
            name: 'CHILD',
            selector: 'post',
            sortable: true,
            minWidth: '50px',
            center: true
        },
        {
            name: 'PARENT',
            selector: 'age',
            sortable: true,
            minWidth: '40px',
            center: true
        },
        {
            name: 'GRAND TOTAL',
            selector: 'salary',
            sortable: true,
            center: true
            // ,
            // minWidth: '175px'
        }
    ]

    const categories = ['Employees', 'Spouse', 'Children', 'Parents', 'Groups']
    const series = [
        {
            data: [40, 20, 30, 10, 40]
        }
    ]
    return (
        <Fragment>
            <Row>
                <Col xs='12' lg='6'>
                    <ApexLineChart height={250} inputSeries={series} categories={categories} title={'Average of Age'} warning={colors.warning.main} />
                </Col>
                <Col xs='12' lg='6'>
                    <DemographicSpouseRatio />
                </Col>
                <Col xs='12' lg='6'>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Composition of covered members
                            </CardTitle>
                        </CardHeader>
                        {/* <CardBody> */}
                        <DataTable
                            noHeader
                            data={data}
                            columns={compositionColumns}
                            className='react-dataTable'
                            sortIcon={<ChevronDown size={10} />}
                        />
                        {/* </CardBody> */}
                    </Card>
                </Col>
                <Col xs='12' lg='6'>
                    <ApexBarChart height={245} categories={['19 - 25 Yrs', '26 - 35 Yrs', '36 - 45 Yrs', '56 - 65 Yrs']} title={'Age-band wise distribution of covered employees'}></ApexBarChart>
                    <ApexBarChart height={245} categories={['19 - 25 Yrs', '26 - 35 Yrs', '36 - 45 Yrs', '56 - 65 Yrs']} title={'Age-band wise distribution of covered spouses'}></ApexBarChart>
                </Col>
            </Row>
        </Fragment>
    )
}
export default Demographics2