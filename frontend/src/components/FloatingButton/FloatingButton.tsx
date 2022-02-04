import * as React from 'react'
import './index.css'

interface Props {
    onClick?: () => void,
    enableIcon?: React.ReactElement<any, any>,
    disableIcon?: React.ReactElement<any, any>,
    enabled: boolean
}

export default function FloatingButton(props: Props) {
    return (
        <div onClick={props.onClick} className="FloatingButton" style={{'color': props.enabled ? 'white' : 'gray'}}>
            {props.enabled ? props.enableIcon : props.disableIcon}
        </div>
    )
}