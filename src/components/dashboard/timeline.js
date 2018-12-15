import React from 'react';
// import {Timeline, TimelineEvent} from 'react-event-timeline'
// import Grid from '@material-ui/core/Grid';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import Rowing from '@material-ui/icons/Rowing';
import People from '@material-ui/icons/People'
import Work from '@material-ui/icons/Work';
import Computer from '@material-ui/icons/Computer';
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
            date="12-13 December"
            iconStyle={{ background: '#7926f6', color: '#fff'}}
            icon={<Work />}
        >
            <h3 className="vertical-timeline-element-title">Round 1</h3>
            <h4 className="vertical-timeline-element-subtitle">Online Round</h4>
            <p>
            You can appear for the round at any time during these dates.
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="15-16 December"
            iconStyle={{ background: '#7926f6', color: '#fff'}}
            icon={<Computer />}
        >
            <h3 className="vertical-timeline-element-title">Round 2</h3><br/>
            <h4 className="vertical-timeline-element-subtitle">Technical</h4>
            <p>
            This is the task based round. Except Competitive, test for all the domains will be 
            on <a className="color-text-blue" href="recruitment.acmvit.in">recruitment.acmvit.in</a>
            </p><br/>
            <h4 className="vertical-timeline-element-subtitle">Competitive</h4>
            <p>The test will be held 
                on <a className="color-text-blue" href="https://www.hackerrank.com/acm-competitive">hackerrank</a></p>
                <p className="marg-zero">All the participants must fill <a className="color-text-blue" 
                href="https://goo.gl/forms/2qhqDRuIPJAtzqlu1" target="_blank" rel="noopener noreferrer">this</a> form</p>
                <p  className="marg-zero">Only for first and second years.
                </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="17-18 December"
            iconStyle={{ background: '#7926f6', color: '#fff'}}
            icon={<People />}
        >
            <h3 className="vertical-timeline-element-title">Round 3</h3>
            <h4 className="vertical-timeline-element-subtitle">Personal Interview</h4>
            <p>
            All the shortlisted participants of each domain have to appear for personal interview.
            </p>
        </VerticalTimelineElement>
        {/* <VerticalTimelineElement
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            icon={<StarIcon />}
        /> */}
        </VerticalTimeline>
        </div>
    );
}

export default TimeLine;