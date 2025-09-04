import React from 'react'
import "../componentStyles/Card.css"
function Card({props}) {
  return (
    <div className='card-comp'>
    <div className='card-heading'>
        {props.heading}
    </div>
    <div className="card-body">
        {props.content}
    </div>
    </div>
    
  )
}

export default Card
