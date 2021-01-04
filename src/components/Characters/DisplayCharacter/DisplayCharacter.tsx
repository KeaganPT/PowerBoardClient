import React from 'react'

const DisplayCharacter = (props: any) => {

    return(
        <div>
            {props.characterResults.map((character: any, index: number) => {
                return(
                    <div key={index}>
                        <h3>{character.characterName}</h3>
                        <span>{character.tags}</span>
                        <p>{character.description}</p>
                        <h5>{character.user.userName}</h5>
                    </div>
                )
            })}
        </div>
    )
}

export default DisplayCharacter