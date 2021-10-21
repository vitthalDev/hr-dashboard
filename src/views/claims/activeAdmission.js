
// ** React Imports
// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import { useRTL } from '@hooks/useRTL'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useContext, useState } from 'react'
import { Download, Folder, Info, MapPin, MoreVertical } from 'react-feather'
// ** Third Party Components
import {
  Badge, Button, Col, CustomInput, FormGroup, Label, Modal, ModalFooter, Row
} from 'reactstrap'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import InvoiceList from "../apps/invoice/list"
import ApexBarChart from '../charts/apex/ApexBarChart'
import ApexScatterCharts from "../charts/apex/ApexScatterCharts"
// ** Store & Actions
import FilterPanel from "./filterPanel"
import ClaimsGrid from './claimsGrid'


const ActiveAdmission = () => {

  const [isRtl, setIsRtl] = useRTL()

  // ** Theme Colors
  const { colors } = useContext(ThemeColors)
  const renderClient = row => {
    const stateNum = Math.floor(Math.random() * 6),
      states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
      color = states[stateNum]

    if (row.avatar.length) {
      return <Avatar className='mr-50' img={row.avatar} width='32' height='32' />
    } else {
      return <Avatar color={color} className='mr-50' content={row.client ? row.client.name : 'John Doe'} initials />
    }
  }

  const series = [
    {
      name: 'Life Cover Claims',
      data: [
        [14, 170],
        [15, 100],
        [16, 170],
        [17, 170],
        [18, 140],
        [19, 150],
        [20, 120],
        [21, 170],
        [22, 230],
        [23, 130],
        [24, 130]
      ]
    },
    {
      name: 'Health Cover Claims',
      data: [
        [14, 220],
        [15, 280],
        [16, 230],
        [17, 280],
        [18, 320],
        [19, 250],
        [20, 350],
        [21, 280],
        [22, 300],
        [23, 120],
        [24, 320]
      ]
    }
  ]

  const inputSeries = [
    {
      data: [700, 350, 480, 600, 210, 700, 350, 480, 600, 210]
    }
  ]

  return (
    <div>
      <FilterPanel></FilterPanel>
      <Row>
        <Col sm='12'>
          <ClaimsGrid title='Active Admission' />
        </Col>
        <Col sm='12' lg='6'>
          <ApexScatterCharts
            propsSeries={series}
            direction={isRtl ? 'rtl' : 'ltr'}
            primary={colors.primary.main}
            success={colors.success.main}
            warning={colors.warning.main}
          />
        </Col>
        <Col xs='12' lg='6'>
          <ApexBarChart inputSeries={inputSeries} height={390} categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']} direction={isRtl ? 'rtl' : 'ltr'} title='Overall Claim Cost' info={colors.info.main} />
        </Col>
      </Row>

    </div>
  )
}

export default ActiveAdmission