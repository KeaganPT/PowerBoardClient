import React from 'react'
import DisplayPowers from './DisplayPower/DisplayPower'

type powerTypes = {
    powers: Array<any>
}

type propTypes = {
    token: string
}

class Powers extends React.Component<propTypes, powerTypes>{
    constructor(props: any) {
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
                'Authorization': this.props.token
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