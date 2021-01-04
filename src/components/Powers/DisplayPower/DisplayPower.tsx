import React from 'react'

const DisplayPowers = (props: any) => {


    return(
        <div>
            {props.powerResults.map((power: any, index: number) => {
                return(
                    <div key={index} style={{border: '2px solid black'}}>
                        <h3>{power.powerName}</h3>
                        <p>{power.description}</p>
                        <h5>{power.user.userName}</h5>
                    </div>
                )
            })} 
        </div>
    )
}

export default DisplayPowers