import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import dashboard from '@src/assets/images/icons/dashboard.png'
import hospital from '@src/assets/images/icons/hospital.png'
import labs from '@src/assets/images/icons/labs.png'
import providersIcon from '@src/assets/images/icons/providerStats.png'
import used from '@src/assets/images/icons/used.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useEffect, useState } from 'react'
import { MapPin } from 'react-feather'
import { Link } from 'react-router-dom'
// ** Third Party Components
import Select from 'react-select'
import { Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Label, Row } from 'reactstrap'
import Table from '../apps/user/list/Table'
import { apiConfig } from '../../@core/api/serviceConfig'
import classnames from 'classnames'
const Providers = () => {

    const [statsData, setStatsData] = useState({
        activeProviderCount: 0,
        blacklistedProviderCount: 0,
        hospitalProviderCount: 0,
        labProviderCount: 0,
        clinicProviderCount: 0,
        doctorProviderCount: 0,
        pharmacyProviderCount: 0
    })
    const [location, setLocation] = useState([])
    const [providerTypes, setProviderTypes] = useState([])
    useEffect(() => {
        apiConfig.post('/providerdashboard').then(setStatsData)

        apiConfig.post('/populatecities', undefined, undefined, { orgID: 'insuranceId' }).then(data => {
            setLocation(data.map(row => {
                return {
                    ...row,
                    label: `${row.cityName}, ${row.state.stateName}, ${row.state.country.countryName} `
                }


            }))
        })

        apiConfig.post('/populateProviderType').then(data => {
            setProviderTypes(data.map(row => {
                return {
                    ...row,
                    label: row.providerType
                }
            }))
        })

    }, [])

    const providerData = [
        { hospitalName: 'All India Institue of Medical Science', hospitalAddress: 'Grant Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital', caseTillDate: '06', activeCases: '02' },
        { hospitalName: 'Chritian Medical College', hospitalAddress: 'Chami Road, Mumbai - 400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital', caseTillDate: '03', activeCases: '01' },
        { hospitalName: 'Lal Pathology', hospitalAddress: 'Manpado Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Laboratory', caseTillDate: '05', activeCases: '02' },
        { hospitalName: 'Lilavati Hospital', hospitalAddress: 'Manpada Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital.', caseTillDate: '0', activeCases: '0' },
        { hospitalName: 'Chritian Medical College', hospitalAddress: 'Manpada Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital', caseTillDate: '0', activeCases: '0' },
        { hospitalName: 'Care Bloodbank', hospitalAddress: 'Manpada Road, Mumbal-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'Out-Network', providerType: 'Blood Bank', caseTillDate: '0', activeCases: '0' }
    ]

    const providerColumns = [
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
        { name: 'SCHEDULE', selector: 'schedule', sortable: false },
        { name: 'CONTACT', selector: 'contact', sortable: false },
        {
            name: 'NETWORK',
            sortable: false,
            cell: (row) => {
                return (
                    <Badge className='col-9 text-capitalize' color={row.network === 'In-Network' ? 'success' : 'danger'}>
                        {row.network}
                    </Badge>
                )
            }
        },
        { name: 'PROVIDER TYPE', selector: 'providerType', sortable: false },
        { name: 'CASE TILL DATE', selector: 'caseTillDate', sortable: false, center: true },
        { name: 'ACTIVE CASE', selector: 'activeCases', sortable: false, center: true }
    ]

    const [index, setIndex] = useState(0)
    const stats = [
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={providersIcon} width='100%' />} color='primary' stats={statsData.activeProviderCount} statTitle='Providers' />
        </Col>,
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={used} height='35' width='35' />} color='success' stats={statsData.blacklistedProviderCount} statTitle='Used' />
        </Col>,
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={hospital} height='50' width='50' />} color='danger' stats={statsData.hospitalProviderCount} statTitle='Hospital' />
        </Col>,
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={labs} height='35' width='35' />} color='success' stats={statsData.labProviderCount} statTitle='Labs' />
        </Col>,
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={labs} height='35' width='35' />} color='success' stats={statsData.clinicProviderCount} statTitle='Clinic' />
        </Col>,
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={labs} height='35' width='35' />} color='success' stats={statsData.doctorProviderCount} statTitle='Doctor' />
        </Col>,
        <Col className='experiment' lg='3' sm='6'>
            <StatsHorizontal icon={<img src={labs} height='35' width='35' />} color='success' stats={statsData.pharmacyProviderCount} statTitle='Pharmacy' />
        </Col>
    ]
    return (
        <div>
            <Row className='justify-content-between'>
                <div className='d-flex justify-content-start'>

                    <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                        Providers
                    </div>
                    <Breadcrumb className='pl-0 pb-1'>
                        <BreadcrumbItem tag='li'>
                            <Link to='/'>
                                <img src={dashboard} width='20' height='20' />
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem tag='li'>
                            Providers
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className='mr-2'>
                    <span className={classnames('cursor-pointer', index === 0 && 'disabled')} onClick={() => setIndex(index - 1)} style={{ fontSize: '24px' }}><strong>&lt </strong></span>
                    <span className={classnames('cursor-pointer pl-1', index === 2 && 'disabled')} onClick={() => setIndex(index + 1)} style={{ fontSize: '24px' }}><strong>&gt </strong></span>
                </div>
            </Row>
            <Row>

                {/* Stats With Icons Horizontal */}

                {stats.slice(index, (index + 4) % stats.length)}
                {/* Stats With Icons Horizontal */}
            </Row>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Search Filter
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='4'>
                            <FormGroup >
                                <Label>Network</Label>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select' />
                            </FormGroup>
                        </Col>
                        <Col md='4'>
                            <FormGroup >
                                <Label>Location</Label>
                                <Select
                                    options={location}
                                    className='react-select'
                                    classNamePrefix='select' />
                            </FormGroup>
                        </Col>
                        <Col md='4'>
                            <FormGroup >
                                <Label>Hospital / Lab / Bloodbank</Label>
                                <Select
                                    options={providerTypes}
                                    className='react-select'
                                    classNamePrefix='select' />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Row>
                <Col xs='12'>
                    <Table showFilter={false} data={providerData} columns={providerColumns} hideAddButton={true} />
                </Col>
            </Row>
        </div >
    )
}

export default Providers