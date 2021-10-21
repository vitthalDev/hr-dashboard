// ** Reactstrap
import { Fragment, useState } from 'react'
import { CardSubtitle, Badge, Button, Card, CardBody, CardHeader, UncontrolledTooltip, CardTitle, Row, Col } from 'reactstrap'
import PolicyDetailsEdit from './PolicyDetailsEdit'

const PlanCard = ({ selectedUser }) => {
  const [openModal, setOpenModal] = useState(undefined)
  return (
    <Fragment>
      <Card className='plan-card border-primary'>
        <CardHeader className='pt-75 pb-0'>
          <div className='w-100 d-flex justify-content-between'>
            <div>
              <CardTitle tag='h4' className='mb-75'>Current Policy</CardTitle>
              <CardSubtitle tag='h5' className='text-muted'>Family Floater Plan</CardSubtitle>
            </div>
            <div>

            {/* <Col className='d-flex justify-content-end'> */}
            <Badge id='plan-expiry-date' color='light-secondary'>
              INR 5 Lakh
            </Badge>
            </div>
            {/* </Col> */}
          </div>
        </CardHeader>
        <CardBody>
          <ul className='list-unstyled my-1'>
            <li>
              <span className='align-middle'>Term 5-62 Years</span>
            </li>
            <li className='my-25'>
              <span className='align-middle'>21 JAN 2021 -20 JAN 2022</span>
            </li>
            <li>
              <span className='align-middle'>Family Members -4</span>
            </li>
          </ul>
          <div className='d-flex justify-content-between'>
            <Button className='text-center' color='primary' onClick={() => setOpenModal(true)}>
              Upgrade Plan
            </Button>
            <Button className='ml-1 text-center' color='warning'>
              Share Policy
            </Button>
          </div>
        </CardBody>
      </Card>
      {openModal && <PolicyDetailsEdit toggle={() => setOpenModal(false)} />}
    </Fragment>
  )
}

export default PlanCard
