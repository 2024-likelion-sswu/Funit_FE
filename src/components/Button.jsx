import React from 'react'

const Button = ({title, onClick}) => {
    return (
        <div className='button-container' onClick={onClick}>
            <p>{title}</p>
        </div>
    )
}

export default Button
