import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import femaleIcon from '@src/assets/images/icons/female.png'
import maleIcon from '@src/assets/images/icons/male.png'
import users from '@src/assets/images/icons/users.png'
import { DownloadCloud } from 'react-feather'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap'
import UsersList from '../apps/user/list'
import dashboard from '@src/assets/images/icons/dashboard.png'
import { useEffect, useState } from 'react'
import { apiConfig } from '../../@core/api/serviceConfig'

const Employees = (props) => {
    const [maleCount, setMaleCount] = useState(0)
    const [femaleCount, setFemaleCount] = useState(0)
    const [totalEmployees, setTotalEmployees] = useState(0)

    useEffect(() => {
        apiConfig.post('/corporateemployeegendercount').then(data => {
            setMaleCount(data.employeeGenderMaleCount)
            setFemaleCount(data.employeeGenderFemaleCount)
            setTotalEmployees(data.employeeGenderMaleCount + data.employeeGenderFemaleCount)
        })
    }, [])
    return (
        <div>
            <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    Employees
                </div>

                <Breadcrumb className='pl-0 pb-1'>
                    <BreadcrumbItem tag='li'>
                        <Link to='/'>
                            <img src={dashboard} width='20' height='20' />
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        Employees
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row>
                {/* Stats With Icons Horizontal */}
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={users} height='20' width='35' />} color='primary' stats={totalEmployees} statTitle='Employees' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={maleIcon} height='25' width='12' />} color='success' stats={maleCount} statTitle='Male' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={femaleIcon} height='25' width='15' />} color='danger' stats={femaleCount} statTitle='Female' />
                </Col>
                <Col lg='3' sm='6' tag={Link} to='/dashboard/ecards' className='cursor-pointer'>
                    <StatsHorizontal icon={<DownloadCloud size={21} />} color='success' stats='136' statTitle='E-Card Issued' />
                </Col>
                {/* Stats With Icons Horizontal */}
            </Row>
            <Row>
                <Col xs='12'>
                    <UsersList></UsersList>
                </Col>
            </Row>
        </div>
    )
}

export default Employees