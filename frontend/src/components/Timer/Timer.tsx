import * as React from 'react'
import './index.css'

interface Props {
    time: Number
}

export default function Timer(props: Props) {
    return (
        <div className="Timer">
            <span>{props.time}</span>
        </div>
    )
}