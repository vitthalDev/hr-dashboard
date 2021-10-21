import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { useRTL } from '@hooks/useRTL'
import accepted from '@src/assets/images/icons/accepted.png'
import dashboard from '@src/assets/images/icons/dashboard.png'
import endorsement from '@src/assets/images/icons/endorsement.png'
import inProcess from '@src/assets/images/icons/in-process.png'
import rejected from '@src/assets/images/icons/rejected.png'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useContext, useEffect, useState } from "react"
import Chart from 'react-apexcharts'
import { Link, useHistory } from 'react-router-dom'
import { Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import Table from '../apps/user/list/Table'
import ApexBarChart from '../charts/apex/ApexBarChart'
import EndorsementAckNumber from './endorsementAckNumber'
import NewEndorsement from './newEndorsement'
import PaidEndorsement from './paidEndorsement'
import UnpaidEndorsement from './unpaidEndorsement'
import { apiConfig } from '../../@core/api/serviceConfig'

const Endorsement = () => {
    const history = useHistory()
    const [gridData, setGridData] = useState([])

    useEffect(() => {
        apiConfig.post('/corporateendorsmentmemberdetails', {
            pageNo: 0,
            pageSize: 10
        }).then(data => {
            console.log(data)
            setGridData(data.map(row => {
                return {
                    endorsementNo: row.endorsmentNo,
                    empName: row.memberName,
                    type: row.typeID,
                    submissionDate: row.endorsmentDate,
                    reason: row.endorsmentType,
                    // ACTION:
                    status: 'NA'
                }
            }))

        })
    }, [])

    const navigate = (path) => {
        history.push(path)
    }

    const [newEndorsementType, setNewEndorsementType] = useState(undefined)
    const [showNewEndorsement, setShowNewEndorsement] = useState(false)
    const [showNewUnpaidEndorsement, setShowNewUnpaidEndorsement] = useState(false)
    const [showNewPaidEndorsement, setShowNewPaidEndorsement] = useState(false)
    const [showEndorsementAckNumber, setShowEndorsementAckNumber] = useState(false)

    const statusObj = {
        'In-Process': 'light-warning',
        Accepted: 'light-success',
        inactive: 'light-secondary'
    }


    const gridColumns = [
        {
            name: 'ENDORSEMENT NO ',
            sortable: false,
            selector: 'endorsementNo',
            cell: (row) => {
                return (
                    <div onClick={() => navigate(`/endorsement/track/${encodeURIComponent(row.endorsementNo)}`)}>
                        <Link className='text-underline'>
                            {row.endorsementNo}
                        </Link>
                    </div>
                )
            }
        },
        { name: 'TYPE ', sortable: false, selector: 'type' },
        { name: 'EMPLOYEE NAME', sortable: false, selector: 'empName' },
        { name: 'SUBMISSION DATE', sortable: false, selector: 'submissionDate' },
        { name: 'REASON ', sortable: false, selector: 'reason' },
        {
            name: 'STATUS',
            sortable: false,
            selector: 'status',
            cell: row => {
                return (
                    <Badge className='col-6 text-capitalize' color={statusObj[row.status]} pill>
                        {row.status}
                    </Badge>
                )
            }
        }
    ]

    const columnColors = {
        series1: '#826af9',
        series2: '#d2b0ff',
        bg: '#f8d3ff'
    }

    const endorsementMonthwiseOptions = {
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
                    // backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
                    // barRadius: 10,
                    endingShape: 'rounded'
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
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        fill: {
            opacity: 1
        }
    }
    const [isRtl, setIsRtl] = useRTL()
    const { colors } = useContext(ThemeColors)
    const series = [
        {
            name: 'Z India Pvt Ltd',
            data: [90, 120, 55, 100, 80, 90, 120, 55, 100, 80, 90, 120]
        }
    ]

    const updateNewEndorsement = (isNew, endorsementType) => {
        setShowNewEndorsement(false)
        if (isNew) {
            setNewEndorsementType(endorsementType)
            if (endorsementType === 'paid') {
                setShowNewPaidEndorsement(true)
            } else {
                setShowNewUnpaidEndorsement(true)
            }
        } else {
            setShowNewPaidEndorsement(false)
            setShowNewUnpaidEndorsement(false)
        }

    }

    const submitEndorsementRequest = () => {
        setShowNewPaidEndorsement(false)
        setShowNewUnpaidEndorsement(false)
        setShowEndorsementAckNumber(true)
    }

    return (
        <div>
            <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    Endorsement
                </div>
                <Breadcrumb className='pl-0 pb-1'>
                    <BreadcrumbItem tag='li'>
                        <Link to='/'>
                            <img src={dashboard} width='20' height='20' />
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        Endorsement
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row>
                {/* Stats With Icons Horizontal */}
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={endorsement} width='80%' />} color='primary' stats='20' statTitle='Endorsement' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={accepted} width='80%' />} color='success' stats='10' statTitle='Accepted' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={rejected} width='80%' />} color='danger' stats='5' statTitle='Rejected' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={inProcess} width='80%' />} color='warning' stats='5' statTitle='In-process' />
                </Col>
                {/* Stats With Icons Horizontal */}
            </Row>
            <Row>
                <Col xs='12' lg='6'>
                    <ApexBarChart categories={['Address Change', 'Contact Update', 'Members Update', 'Term Update', 'Policy Update']} direction={isRtl ? 'rtl' : 'ltr'} title='Endorsement Reason' info={colors.info.main} />
                </Col>
                <Col xs='12' lg='6'>
                    <Card className='p-sm-50'>
                        <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
                            <CardTitle tag='h4'>Endorsement Monthwise</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Chart options={endorsementMonthwiseOptions} series={series} type='bar' height={294} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs='12'>
                    <div className='app-user-list'>
                        <Table label={'Endorsements'} data={gridData} columns={gridColumns} showFilter={false} addButtonLabel='New Endorsement' addHandler={() => setShowNewEndorsement(true)} />
                    </div>
                </Col>
            </Row>
            {showNewEndorsement && <NewEndorsement toggle={(isSubmit, endorsementType) => updateNewEndorsement(isSubmit, endorsementType)}></NewEndorsement>}
            {showNewPaidEndorsement && <PaidEndorsement submit={() => { submitEndorsementRequest() }} toggle={() => setShowNewPaidEndorsement(false)} />}
            {showNewUnpaidEndorsement && <UnpaidEndorsement submit={() => submitEndorsementRequest()} toggle={() => setShowNewUnpaidEndorsement(false)} />}
            {showEndorsementAckNumber && <EndorsementAckNumber toggle={() => setShowEndorsementAckNumber(false)} />}

        </div>
    )
}

export default Endorsement