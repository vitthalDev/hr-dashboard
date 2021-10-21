import Avatar from '@components/avatar'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import add from '@src/assets/images/icons/add.png'
import dashboard from '@src/assets/images/icons/dashboard.png'
import filter from '@src/assets/images/icons/filter.png'
import heartCare from '@src/assets/images/icons/heart-care.png'
import personInsurance from '@src/assets/images/icons/person-insurance.png'
import plus from '@src/assets/images/icons/plus.png'
import policy from '@src/assets/images/icons/policy.png'
import { Fragment, useEffect, useState } from "react"
import { Download } from "react-feather"
import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { apiConfig } from '../../@core/api/serviceConfig'
import Table from '../apps/user/list/Table'
import NewPolicy from "./newPolicy"
import PolicyFilterModal from './policyFilterModal'
import RequestPolicy from './RequestPolicy'

const Policies = () => {

    const renderClient = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        return <Avatar color={color || 'primary'} className='mr-1' content={row.planName[0]} initials />
    }

    const [policyCount, setPolicyCount] = useState(0)

    const [policyData, setPolicyData] = useState([])

    useEffect(() => {
        apiConfig.post('/corporatepolicycount').then(data => {
            setPolicyCount(data.policiesCount)
        })
        apiConfig.post('/corporatepolicycategoriescount').then(data => {
            console.log(data)
            // debugger 
        })
        apiConfig.post('/policyDetails').then(data => {
            setPolicyData(data)
            // debugger 
        })
    }, [])

    const history = useHistory()

    const navigateToPayment = () => {
        history.push('/policies/payment')
    }

    const [showFilterModal, setShowFilterModal] = useState(false)
    // { policyName: 'Family Floater Plan', members: '112', type: 'Health Cover', inceptionDate: '25 Jan 2021', expiryDate: 'expired' },
    // { policyName: 'Add-On Health', members: '30', type: 'Health Cover', inceptionDate: '25 Jan 2021', expiryDate: '25 Jan 2021' },
    // { policyName: 'Joint Health Insurance', members: '10', type: 'Health Cover', inceptionDate: '25 Jan 2021', expiryDate: '25 Jan 2021' },
    // { policyName: 'Critical Illness Plan', members: '05', type: 'Life Cover', inceptionDate: '25 Jan 2021', expiryDate: '25 Jan 2021' },
    // { policyName: 'Group Health Insurance', members: '14', type: 'Health Cover', inceptionDate: '25 Jan 2021', expiryDate: '25 Jan 2021' },
    // { policyName: 'Aushmaan Health Cover', members: '14', type: 'Life Cover', inceptionDate: '25 Jan 2021', expiryDate: '25 Jan 2021' }
    // ])

    const policyColumns = [
        {
            name: 'POLICY NAME',
            sortable: true,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    {renderClient(row)}
                    <div className='d-flex flex-column'>
                        <span className='font-weight-bold'>{row.planName}</span>
                        {/* <small className='text-truncate text-muted mb-0'>@{row.username}</small> */}
                    </div>
                </div>
            )
        },
        { name: 'MEMBERS ', sortable: true, selector: 'members', center: true },
        { name: 'TYPE', sortable: true, selector: 'type' },
        { name: 'INCEPTION DATE', sortable: true, selector: 'policyInceptionDate' },
        {
            name: 'EXPIRY DATE',
            sortable: true,
            cell: (row) => {
                return (
                    <Fragment>
                        {row.policyUpto === 'EXPIRED' ? <Fragment>
                            <Row className='text-center'>
                                <Col xs='8' className='mb-n1'>
                                    <div style={{ color: 'red' }}>Expired</div> <br />
                                </Col>
                                <Col xs='8' onClick={() => navigateToPayment()}>
                                    <div class='cursor-pointer rounded-lg p-sm-50 text-white bg-danger'>
                                        <Link to='/policies/payment'>
                                            Renew
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Fragment> : row.policyExpiredDate}
                    </Fragment>
                )
            }
        },
        {
            name: 'REPORT',
            sortable: true,
            cell: (row) => {
                return (
                    <Download />
                )
            }
        }
    ]

    const [modal, toggleModal] = useState(false)
    const [requestPolicyModal, setRequestPolicyModal] = useState(false)
    const createNewPolicy = (e) => {
        e.preventDefault()
        toggleModal(true)
    }
    const requestNewPolicy = (e) => {
        e.preventDefault()
        setRequestPolicyModal(true)
    }

    return (

        <div>
            <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    Policies
                </div>
                <Breadcrumb className='pl-0 pb-1'>
                    <BreadcrumbItem tag='li'>
                        <Link to='/'>
                            <img src={dashboard} width='20' height='20' />
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        Policies
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row>
                {/* Stats With Icons Horizontal */}
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={policy} height='25' width='20' />} color='primary' stats={policyCount} statTitle='No. of Policy' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={heartCare} height='25' width='25' />} color='success' stats='90' statTitle='Health Cover' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={personInsurance} height='25' width='25' />} color='danger' stats='46' statTitle='Life Cover' />
                </Col>
                <Col lg='3' sm='6' onClick={requestNewPolicy}>
                    <StatsHorizontal className='cursor-pointer' icon={<img src={add} height='25' width='25' />} bgColor='bg-primary' stats='Request Policy' statTitle='' />
                </Col>
                {/* Stats With Icons Horizontal */}
            </Row>
            <Row>
                <Col xs='12'>
                    {/* <InvoiceList></InvoiceList> */}
                    <Table headerComponent={
                        <CardHeader className='pl-3'>
                            <CardTitle>
                                <Row>
                                    No. Of Policies
                                    <img className='cursor-pointer' onClick={() => setShowFilterModal(true)} src={filter} height='25' width='25' />
                                    <img className='cursor-pointer' onClick={createNewPolicy} src={plus} height='25' width='25' />
                                </Row>
                            </CardTitle>
                        </CardHeader>
                    }
                        showFilter={false}
                        data={policyData}
                        columns={policyColumns}
                        hideAddButton={true} addHandler={createNewPolicy} hideSearchOption={true}
                    />
                </Col>
            </Row>
            {modal && <NewPolicy toggleModal={toggleModal} />}
            {requestPolicyModal && <RequestPolicy toggleModal={setRequestPolicyModal} />}
            {showFilterModal && <PolicyFilterModal toggleModal={setShowFilterModal} />}
        </div>
    )
}

export default Policies