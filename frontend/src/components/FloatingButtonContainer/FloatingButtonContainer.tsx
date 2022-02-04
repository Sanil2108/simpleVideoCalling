import * as React from 'react'
import './index.css'

interface Props {
    children: Array<Object>
}

export default function FloatingButtonContainer(props: Props) {
    return (
        <div className="FloatingButtonContainer">
            {/* <div className="FloatingButtonContainerBackdrop" /> */}
            {props.children}
        </div>
    )
}