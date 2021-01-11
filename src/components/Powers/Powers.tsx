import React from 'react'
import DisplayPowers from './DisplayPower/DisplayPower'
import APIURL from '../../helpers/enviorment'

type powerInterface = {
    powerName: string,
    description: string,
    user: {userName: string}
    id: number
}

type powerTypes = {
    powers: Array<powerInterface>
}

type propTypes = {
    token: string | null,
    userRole: string | null
}

class Powers extends React.Component<propTypes, powerTypes>{
    constructor(props: propTypes) {
        super(props)
        this.state = {
            powers: [],
        }
        this.deletePower = this.deletePower.bind(this)
    }

    getAllPowers() {
        fetch(`${APIURL}/powers/`, {
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

    deletePower(id: number) {
        fetch(`${APIURL}/powers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getAllPowers()
    }

    render(){
        return (
            <div>
                <DisplayPowers 
                    powerResults={this.state.powers}
                    deletePower={this.deletePower}
                    token={this.props.token}
                    userRole={this.props.userRole}
                />
            </div>
        )
    }
}

export default Powers;