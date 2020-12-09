import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

export default function SpecialButton({children, title, onClick, btnClassName, tipClassName, placement}) {
    return (
        <Tooltip title={title ? title : null} className={tipClassName} placement={placement}>
            <IconButton className={btnClassName} onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    
    )
}
