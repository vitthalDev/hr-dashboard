import { useState } from "react"
import { Card, CardBody, CardTitle, Progress } from "reactstrap"

const DemographicSpouseTile = (props) => {
    return (
        <div className='mt-2 mb-50'>
            <CardTitle className='mb-0 font-medium-3'>{props.data.key}</CardTitle>
            <span>{props.data.value}</span>
            <Progress
                color={props.data.color}
                className={`avg-session-progress`}
                value={props.data.progress}
            />
        </div>
    )
}


const DemographicSpouseRatio = (props) => {
    const [spouseData, setSpouseData] = useState([
        { key: 'Employee Spouse Ratio', value: '1 : 0.80', progress: '60', color: 'warning' },
        { key: 'Employee Child Ratio', value: '1 : 0.80', progress: '40', color: 'primary' },
        { key: 'Employee Parents Ratio', value: '1 : 0.80', progress: '90', color: 'success' },
        { key: 'Employee All Department', value: '1 : 0.80', progress: '20', color: 'danger' }
    ])

    // const renderRatioTile = () => {
    //     return spouseData.map((row, index) => {
    //         return <DemographicSpouseTile key={index} data={row}></DemographicSpouseTile>
    //     })
    // }

    return (
        <Card>
            <CardBody>
                {spouseData.map((row, index) => {
                    return <DemographicSpouseTile key={index} data={row}></DemographicSpouseTile>
                })}
            </CardBody>
        </Card>
    )
}

export default DemographicSpouseRatio