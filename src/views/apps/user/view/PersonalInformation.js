import { Fragment, useState } from "react"
import { Edit } from "react-feather"
import { Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle } from "reactstrap"
import PersonalDetailsEdit from "./PersonalDetailsEdit"

const PersonalInformation = (props) => {
    const [openModal, setOpenModal] = useState(undefined)
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardSubtitle className='mt-0'>
                    <Edit className='cursor-pointer' size={14} onClick={() => setOpenModal(true)} />
                    </CardSubtitle>
                </CardHeader>
                <CardBody className='pt-1'>
                    <div className='d-flex justify-content-between pt-75'>
                        <CardText tag='span' className='user-info-title mb-0'>
                            Phone
                        </CardText>
                        <CardText>
                            8654123790
                        </CardText>
                    </div>
                    <div className='d-flex justify-content-between pt-75'>
                        <CardText tag='span' className='user-info-title mb-0'>
                            Nationality
                        </CardText>
                        <CardText>
                            Indian
                        </CardText>
                    </div>
                    <div className='d-flex justify-content-between pt-75'>
                        <CardText tag='span' className='user-info-title mb-0'>
                            Religion
                        </CardText>
                        <CardText>
                            Hindu
                        </CardText>
                    </div>
                    <div className='d-flex justify-content-between pt-75'>
                        <CardText tag='span' className='user-info-title mb-0'>
                            Marital Status
                        </CardText>
                        <CardText>
                            Married
                        </CardText>
                    </div>
                    <div className='d-flex justify-content-between pt-75'>
                        <CardText tag='span' className='user-info-title mb-0'>
                            Employment of Spouse
                        </CardText>
                        <CardText>
                            House Wife
                        </CardText>
                    </div>
                    <div className='d-flex justify-content-between pt-75'>
                        <CardText tag='span' className='user-info-title mb-0'>
                            No of Children
                        </CardText>
                        <CardText>
                            02
                        </CardText>
                    </div>
                </CardBody>
            </Card>
            {openModal && <PersonalDetailsEdit toggle={() => setOpenModal(false)} />}
        </Fragment>
    )
}
export default PersonalInformation