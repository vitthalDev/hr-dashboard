// ** React Imports
// ** Custom Components
import Avatar from '@components/avatar'
import { Fragment, useState } from 'react'
import { DollarSign, Flag, Gift, Mail, Phone, TrendingUp } from 'react-feather'
// ** Third Party Components
import { Button, Card, CardBody, CardText, Col, Row } from 'reactstrap'
import PersonalDetailsEdit from './PersonalDetailsEdit'
import ProfileDetailsEdit from './ProfileDetailsEdit'


const UserInfoCard = ({ selectedUser }) => {
  const [openModal, setOpenModal] = useState(undefined)
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar.length) {
      return <img src={selectedUser.avatar} alt='user-avatar' className='img-fluid rounded' height='104' width='104' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={selectedUser.fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    }
  }

  const renderEmpId = () => {
    return `TT-${(`000${selectedUser.id}`).slice(-3)}`
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col xl='6' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
              <div className='user-avatar-section'>
                <div className='d-flex justify-content-start'>
                  {renderUserImg()}
                  <div className='d-flex flex-column ml-1'>
                    <div className='user-info mb-1'>
                      <h4 className='mb-0'>{selectedUser !== null ? selectedUser.fullName : 'Eleanor Aguilar'}</h4>
                      <CardText tag='span' className='text-capitalize'>
                        {selectedUser !== null ? selectedUser.role : 'Manager'}
                      </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center'>
                      <Button.Ripple onClick={() => setOpenModal(true)} color='primary'>
                        Edit
                      </Button.Ripple>
                      <Button.Ripple className='ml-1' color='danger' outline>
                        Delete
                      </Button.Ripple>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center user-total-numbers'>
                <div className='d-flex align-items-center mr-2'>
                  <div className='color-box bg-light-primary'>
                    <DollarSign className='text-primary' />
                  </div>
                  <div className='ml-1'>
                    <h5 className='mb-0'>Employee Id</h5>
                    <small>{renderEmpId()}</small>
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <div className='color-box bg-light-success'>
                    <TrendingUp className='text-success' />
                  </div>
                  <div className='ml-1'>
                    <h5 className='mb-0'>Date of Join</h5>
                    <small>1<sup>st</sup> Jan 2013</small>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
              <div className='user-info-wrapper'>
                <div className='d-flex flex-wrap align-items-center'>
                  <div className='user-info-title'>
                    <Phone className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Phone
                    </CardText>
                  </div>
                  <CardText className='mb-0'>
                    {selectedUser !== null ? selectedUser.contact : '+91 987098970'}
                  </CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center my-50'>
                  <div className='user-info-title'>
                    <Mail className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Email
                    </CardText>
                  </div>
                  <CardText className='mb-0'>
                    {selectedUser !== null ? selectedUser.email : 'Active'}
                  </CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center my-50'>
                  <div className='user-info-title'>
                    <Gift className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Birthday
                    </CardText>
                  </div>
                  <CardText className='text-capitalize mb-0'>
                    {selectedUser !== null ? selectedUser.birthday || '24 Jul 1991' : 'Admin'}
                  </CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center my-50'>
                  <div className='user-info-title'>
                    <Flag className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Address
                    </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser !== null ? selectedUser.address || 'India' : 'England'}</CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center'>
                  <div className='user-info-title'>
                    <Phone className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Gender
                    </CardText>
                  </div>
                  <CardText className='mb-0 text-capitalize'>{selectedUser !== null ? selectedUser.gender || 'Unknown' : 'Unknown'}</CardText>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {openModal && <ProfileDetailsEdit toggle={() => setOpenModal(false)} />}
    </Fragment>
  )
}

export default UserInfoCard
