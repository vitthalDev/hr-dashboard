// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
import InvoiceList from '../../invoice/list'
import PermissionsTable from './PermissionsTable'

// ** Styles
import '@styles/react/apps/app-users.scss'
import PersonalInformation from './PersonalInformation'
import EmergencyContact from './EmergencyContact'
import FamilyDetails from './FamilyDetails'
import FamilyDetailsEdit from './FamilyDetailsEdit'

const UserView = props => {
  // ** Vars
  const store = useSelector(state => state.users),
    dispatch = useDispatch(),
    { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(parseInt(id)))
  }, [dispatch])


  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='9' lg='8' md='7'>
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
        <Col xl='3' lg='4' md='5'>
          <PlanCard selectedUser={store.selectedUser} />
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          {/* <UserTimeline /> */}
          <PersonalInformation user={store.selectedUser} />
        </Col>
        <Col md='6'>
          <EmergencyContact user={store.selectedUser} />
          {/* <PermissionsTable /> */}
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <FamilyDetails />
          {/* <InvoiceList /> */}
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView