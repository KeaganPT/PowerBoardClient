import React from 'react'
import DisplayPowers from './DisplayPower/DisplayPower'

type powerInterface = {
    powerName: string,
    description: string,
    user: {userName: string}
}

type powerTypes = {
    powers: Array<powerInterface>
}

type propTypes = {
    token: string | null
}

class Powers extends React.Component<propTypes, powerTypes>{
    constructor(props: propTypes) {
        super(props)
        this.state = {
            powers: [],
        }
    }

    getAllPowers() {
        fetch('http://localhost:3000/powers/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                powers: data
            });
            // console.log(data);
        })
    }

    componentDidMount() {
        this.getAllPowers()
    }

    render(){
        return (
            <div>
                <DisplayPowers powerResults={this.state.powers}/>
            </div>
        )
    }
}

export default Powers;