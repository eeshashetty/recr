import React from 'react';
// import {Timeline, TimelineEvent} from 'react-event-timeline'
// import Grid from '@material-ui/core/Grid';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import Rowing from '@material-ui/icons/Rowing';
import People from '@material-ui/icons/People'
import Work from '@material-ui/icons/Work';
import Computer from '@material-ui/icons/Computer';
import { Link } from 'react-router-dom';
// import SchoolIcon from '@material-ui/icons/SchoolIcon';
// import StarIcon from '@material-ui/icons/StarIcon';


const TimeLine = () => {
  return (
    // <div className="timeline">
    //     <Timeline>
    //         <TimelineEvent className="timeline-event" 
    //             title="First Round of Recruitments"
    //             createdAt="12-13 December"
    //             icon={<i className="material-icons md-18">textsms</i>}
    //         >
    //             I received the payment for $543. Should be shipping the item within a couple of hours.
    //         </TimelineEvent>
    //         <TimelineEvent
    //             className="timeline-event"
    //             title="You sent an email to John Doe"
    //             createdAt="2016-09-11 09:06 AM"
    //             icon={<i className="material-icons md-18">email</i>}
    //         >
    //             Like we talked, you said that you would share the shipment details? This is an urgent order and so I
    //                 am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
    //                 gentle reminder if you are on track already!
    //         </TimelineEvent>
    //     </Timeline>
    // </div>
    <div className="timeline center-vert">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="5-6 December"
          iconStyle={{ background: '#7926f6', color: '#fff' }}
          icon={<Work />}
        >
          <h3 className="vertical-timeline-element-title">Round 1</h3>
          <h4 className="vertical-timeline-element-subtitle">Online Round</h4>
          <p>
            You can appear for the round at any time during these dates.
            Except Competitive, test for all the domains will be
            on <Link className="color-text-blue" to="/">recruitment.acmvit.in</Link> from 5th December,
            evening 5pm</p><br />
          <h4 className="vertical-timeline-element-subtitle">Competitive</h4>
          <p>The test will be held
                on <a className="color-text-blue" href="https://www.hackerrank.com/acmvit-cpr20">hackerrank</a> from 6th December, 3PM,
                and is of 24hrs. </p>
          <p className="marg-zero">All the participants must fill <a className="color-text-blue"
            href="https://forms.gle/96oGNWpLQLqP1PsXA" target="_blank" rel="noopener noreferrer">this</a> form</p>
          <p className="marg-zero">Only for first and second years.
                </p>

        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="8 December"
          iconStyle={{ background: '#7926f6', color: '#fff' }}
          icon={<Computer />}
        >
          <h3 className="vertical-timeline-element-title">Round 2</h3><br />
          <h4 className="vertical-timeline-element-subtitle">Offline</h4>
          <p>Venue and time will be informed to the shortlisted participants.</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="To be announced"
          iconStyle={{ background: '#7926f6', color: '#fff' }}
          icon={<People />}
        >
          <h3 className="vertical-timeline-element-title">Round 3</h3>
          <h4 className="vertical-timeline-element-subtitle">Personal Interview</h4>
          <p>
            All the shortlisted participants of each domain have to appear for personal interview.
            </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default TimeLine;