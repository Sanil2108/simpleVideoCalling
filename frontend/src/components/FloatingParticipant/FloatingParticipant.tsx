import * as React from 'react'
import SingleParticipant from '../SingleParticipant/SingleParticipant'
import './index.css'

interface Props {
}

export default function FloatingParticipantComponent(props: Props) {
    return (
        <div className="FloatingParticipantComponent">
            <SingleParticipant />
        </div>
    )
}