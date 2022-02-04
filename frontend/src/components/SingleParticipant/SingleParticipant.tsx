import * as React from 'react'
import './index.css'

interface Props {
    participantName?: string
}

export default function SingleParticipant(props: Props) {
    return (
        <div className="SingleParticipantComponent">
            {props.participantName ? <div className="ParticipantNameContainer">
                <div className="ParticipantName">{props.participantName}</div>
            </div> : null}
            <div className="ParticipantVideo">
            </div>
        </div>
    )
}