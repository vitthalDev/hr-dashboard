import { Fragment, useState } from "react"
import DataTable from "react-data-table-component"
import { Edit2, Trash } from "react-feather"
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import FamilyDetailsEdit from "./FamilyDetailsEdit"

const FamilyDetails = (props) => {
    const [openModal, setOpenModal] = useState(undefined)
    const familyColumns = [
        { name: 'Name', selector: 'name' },
        { name: 'Relationship', selector: 'relationship' },
        { name: 'D.O.B', selector: 'dob' },
        { name: 'Contact', selector: 'contact' },
        {
            name: 'Action',
            width: '100px',
            cell: (row) => {
                return (
                    <div>
                        <Edit2 className='cursor-pointer mr-50' size={14} onClick={() => setOpenModal(true)} />
                        <Trash size={14} />
                    </div>
                )
            }
        }
    ]
    const familyData = [

        { name: 'Anjali Saxena', relationship: 'Spouse', contact: '+91 2365412758', dob: '12 June 1980' },
        { name: 'Rahul Saxena', relationship: 'Son', contact: '+91 5467891234', dob: '20 Aug 1990' },
        { name: 'Riya Saxena', relationship: 'Daughter', contact: '+91 5467891234', dob: '02 sept 1993' },
        { name: 'Rakesh Saxena', relationship: 'Father', contact: '+91 5467891234', dob: '20 June 1971' },
        { name: 'Pooja Saxena', relationship: 'Mother', contact: '+91 5467891234', dob: '02 sept 1973' }

    ]
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Family Details
                    </CardTitle>
                </CardHeader>
                <DataTable
                    noHeader
                    data={familyData}
                    columns={familyColumns}
                    className='react-dataTable' />
            </Card>
            {openModal && <FamilyDetailsEdit toggle={() => setOpenModal(false)} />}
        </Fragment>
    )
}
export default FamilyDetails