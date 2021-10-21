import Table from '../apps/user/list/Table'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Clock, Copy, DownloadCloud, MapPin, Users } from 'react-feather'
import ActiveAdmissions from './activeAdmissions'
import { ActiveHealth } from './activeHealth'
import CommonDiseases from './commonDiseases'
import ECardTable from './ecard-table'
import Policies from './policies'
import TableServerSide from './tableServerSide'
import claimsIcon from '@src/assets/images/icons/claims.png'
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import dashboard from '@src/assets/images/icons/dashboard.png'
import { Link } from 'react-router-dom'
import Avatar from '../../@core/components/avatar'
import { apiConfig } from '../../@core/api/serviceConfig'

const Dashboard = (props) => {
    const context = useContext(ThemeColors)
    const [activeAdmissionsData, setActiveAdmissionsData] = useState([])
    const [eCardVisible, setEcardVisible] = useState(props && props.showECard)
    const selectEcard = () => {
        console.log('updating')
        setEcardVisible(!eCardVisible)
    }

    const [employeeCount, setEmployeeCount] = useState(0)
    const [totalClaims, setTotalClaims] = useState(0)
    const [policyCount, setPolicyCount] = useState(0)

    useEffect(() => {
        apiConfig.post('/activeclaims').then(data => {
            const totalClaims = data.reduce((a, b) => a + b.claimCount, 0)
            setTotalClaims(totalClaims)
        })
        apiConfig.post('/corporateemployeecount').then(data => {
            setEmployeeCount(data.employeeCount)
        })
        apiConfig.post('/corporatepolicycount').then(data => {
            setPolicyCount(data.policiesCount)
        })
    }, [])

    for (let i = 0; i < 10; i++) {
        activeAdmissionsData.push(...[
            { id: `${(i * 5) + 1}`, avatar: '', empName: 'Rahul Saxena', designation: 'Manager', admissionDate: '20 Jan 2021', estDischargeDate: '24 Jan 2021', hospitalName: 'All India Institue of Medical Science', hospitalAddress: '9 Grant Road, Mumbai 400000', admissionReason: 'Cardiac Arrest' },
            { id: `${(i * 5) + 2}`, avatar: '', empName: 'Nikhil D', designation: 'Tax Consultant', admissionDate: '5 Jan 2021', estDischargeDate: '10 Jan 2021', hospitalName: 'Chritian Medical College', hospitalAddress: '9 Charni Road. Mumbai 400000', admissionReason: 'Fever' },
            { id: `${(i * 5) + 3}`, avatar: '', empName: 'Anjali Saxena', designation: 'Designer', admissionDate: '10 Jan 2021', estDischargeDate: '15 Jan 2021', hospitalName: 'Tata Memorial Hospital', hospitalAddress: 'Manpada Road, Mumbai - 400000', admissionReason: 'Malaria' },
            { id: `${(i * 5) + 4}`, avatar: '', empName: 'Vishal Singh', designation: 'Developer', admissionDate: '20 Jan 2021', estDischargeDate: '22 Jan 2021', hospitalName: 'Lilavati Hospital', hospitalAddress: 'Manpada Road, Mumbai - 400000', admissionReason: 'Jaundice' },
            { id: `${(i * 5) + 5}`, avatar: '', empName: 'Nikhil D', designation: 'Senior Manager', admissionDate: '5 Jan 2021', estDischargeDate: '10 Jan 2021', hospitalName: 'Chritian Medical College', hospitalAddress: 'Manpada Road. Mumbai - 400000', admissionReason: 'Fever' }
        ])
    }


    const renderClient = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (row.avatar.length) {
            return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />
        } else {
            return <Avatar color={color || 'primary'} className='mr-1' content={row.empName || 'John Doe'} initials />
        }
    }

    const activeAdmissionsColumns = [
        {
            name: 'EMPLOYEE NAME',
            selector: 'empName',
            sortable: true,
            minWidth: '200px',
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    {renderClient(row)}
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/employees/profile/${row.id}`}
                            className='user-name text-truncate mb-0 text-underline'
                        >
                            <span className='font-weight-bold'>{row.empName}</span>
                        </Link>
                        {/* <small className='text-truncate text-muted mb-0'>@{row.username}</small> */}
                    </div>
                </div>
            )
        },
        {
            name: 'HOSPITAL NAME',
            sortable: true,
            minWidth: '250px',
            cell: (row) => {
                const mapPin = {
                    color: 'red'
                }
                return (
                    <div>
                        <div>
                            <a className='font-small-2 font-weight-bold text-underline'>{row.hospitalName}</a>
                        </div>
                        <div>
                            <MapPin style={mapPin} size={15} />
                            <span className='font-small-1'> {row.hospitalAddress}</span>
                        </div>

                    </div>
                )
            }
        },
        {
            name: 'DESIGNATION',
            selector: 'designation',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: 'ADMISSION DATE',
            selector: 'admissionDate',
            sortable: true,
            minWidth: '170px'
        },
        {
            name: 'ESTIMATED DISCHARGE DATE',
            selector: 'estDischargeDate',
            sortable: true,
            minWidth: '230px'
        },
        {
            name: 'REASON OF ADMISSION',
            selector: 'admissionReason',
            sortable: true,
            minWidth: '200px'
        }
    ]

    return (
        <div>
            {eCardVisible && <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    E Card
                </div>

                <Breadcrumb className='pl-0 pb-1'>
                    <BreadcrumbItem tag='li'>
                        <Link to='/'>
                            <img src={dashboard} width='20' height='20' />
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        E Card
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            }

            <Row>
                {/* Stats With Icons Horizontal */}
                <Col lg='3' sm='6' tag={Link} to='/employees' className='cursor-pointer'>
                    <StatsHorizontal icon={<Users size={21} />} color='primary' stats={employeeCount} statTitle='Employees' />
                </Col>
                <Col lg='3' sm='6' tag={Link} to='/policies' className='cursor-pointer'>
                    <StatsHorizontal icon={<Copy size={21} />} color='success' stats={policyCount} statTitle='Policy Category' />
                </Col>
                <Col lg='3' sm='6' tag={Link} to='/claims' className='cursor-pointer'>
                    <StatsHorizontal icon={<img src={claimsIcon} height='24' width='20' />} color='danger' stats={totalClaims} statTitle='Claims' />
                </Col>
                {/* <Col lg='3' sm='6' tag={Link} to='/dashboard/ecards' className='cursor-pointer'> */}
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<DownloadCloud size={21} />} color='success' className={eCardVisible ? 'border-success' : ''} stats='136' statTitle='Pre-Auth' />
                </Col>
                {/* Stats With Icons Horizontal */}
            </Row>
            {eCardVisible ? <ECardTable /> : <Fragment>
                <Row>
                    <Col lg='8' sm='12'>
                        <Policies></Policies>
                    </Col>
                    <Col lg='4' sm='12'>
                        <ActiveAdmissions primary={context.colors.primary.main}
                            success={context.colors.success.main}
                            warning={context.colors.warning.main}
                            danger={context.colors.danger.main} />
                    </Col>
                </Row>
                <Row>
                    <Col sm='12'>
                        <Table label={'Active Admissions'} showFilter={false} hideAddButton={true} hideSearchOptino={true} data={activeAdmissionsData} columns={activeAdmissionsColumns} />
                    </Col>
                </Row>
                <Row>
                    <Col lg='4' sm='6'>
                        <CommonDiseases primary={context.colors.primary.main}
                            warning={context.colors.warning.main}
                            danger={context.colors.danger.main} />
                    </Col>
                    <Col lg="8" sm="6">
                        <ActiveHealth title="Active Health Challenges" />
                    </Col>
                </Row>
            </Fragment>
            }
        </div>
    )
}

export default Dashboard