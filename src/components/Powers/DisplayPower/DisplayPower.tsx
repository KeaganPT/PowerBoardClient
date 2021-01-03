import React from 'react'

const DisplayPowers = (props: any) => {


    return(
        <div>
            {props.powerResults.map((power: any, index: number) => {
                return(
                    <div key={index}>
                        <h3>{power.powerName}</h3>
                        <h4>{power.description}</h4>
                        <h5>{power.user.userName}</h5>
                    </div>
                )
            })} 
        </div>
    )
}

export default DisplayPowers