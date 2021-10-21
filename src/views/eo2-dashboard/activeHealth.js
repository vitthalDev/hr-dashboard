import { Card, CardBody, CardTitle, Row, Col, Progress, CardHeader } from "reactstrap"
import Avatar from "../../@core/components/avatar"
const data = [
  {
    title: "#FitestWomen",
    participantCount: 150,
    totalDays: 20,
    name: "Neha",
    leader: true,
    daysLeft: 10
  },
  {
    title: "#Fitin 40",
    participantCount: 100,
    totalDays: 20,
    name: "Rahul",
    leader: true,
    daysLeft: 5
  },
  {
    title: "#10KStepsDaily",
    participantCount: 80,
    totalDays: 20,
    daysLeft: 15,
    name: "Nisha",
    leader: true
  }
]

export const ActiveHealth = ({ title }) => {
  const content = data.map((person, index) => {
    const constProgressValue = 100 - ((person.daysLeft / person.totalDays) * 100)
    let progressBarClass = "progress-bar-danger"
    if (constProgressValue < 50) {
      progressBarClass = "progress-bar-success"
    } else if (constProgressValue < 75) {
      progressBarClass = "progress-bar-warning"
    }
    return (
      // <Row key={index}>
      //   <Col xs="12">
      //     <div className="d-flex justify-content-between align-items-center mb-1 mt-1">
      //       <div>
      //         <h2>{person.title}</h2>
      //         <h5>{person.participantCount} Participants</h5>
      //       </div>
      //       <div className="mr-1 d-flex justify-content-md-around align-items-center">
      //         <span className="mr-1">
      //           <h4>{person.name}</h4>
      //           {person.leader && <div>Leading</div>}
      //           <div>{person.daysLeft} Days Left</div>
      //         </span>
      //         <span>
      //           <Avatar
      //             imgClassName="avatar"
      //             imgHeight={90}
      //             imgWidth={90}
      //             img="static/media/avatar-s-11.1d46cc62.jpg"
      //           />
      //         </span>
      //       </div>
      //     </div>
      //   </Col>
      //   <Col xs="12">
      //     <Progress
      //       className={`avg-session-progress mt-25 ${progressBarClass}`}
      //       value={constProgressValue}
      //     />
      //   </Col>
      // </Row>
      <Row key={index} className='mt-2 ml-2 mb-xl-3 mb-lg-2'>
        <Col xs='9' className='pr-0'>
          <div>
            <h2>{person.title}</h2>
            <h5>{person.participantCount} Participants</h5>
            <div>

              <Progress
                className={`avg-session-progress mt-25 ${progressBarClass}`}
                value={constProgressValue}
              />
            </div>
          </div>
        </Col>
        <Col xs='3' className='pl-50'>
          <div className="mr-1 d-flex justify-content-md-around align-items-center">
            <span>
              <h4 className='mb-0'>{person.name}</h4>
              {person.leader && <div>Leading</div>}
              <div>{person.daysLeft} Days Left</div>
            </span>
            <span>
              <Avatar
                imgClassName="avatar"
                imgHeight={65}
                imgWidth={65}
                img={require(`@src/assets/images/avatars/${index + 1}.png`).default}
              />
            </span>
          </div>
        </Col>
      </Row>
    )
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody className='pb-xl-0'>
        {content}
      </CardBody>
    </Card>
  )
}
