import React, {Component} from 'react'

import OrderService from "../services/OrderService";

class ViewLimitOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.history.location.state.user,
            limitOrders: [],
            isCanceled: false
        }
        this.back = this.back.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        this.findLimit()
    }

    findLimit() {
        OrderService.findLimit(this.state.user.id).then((res) => {
            this.setState({limitOrders: res.data})
        })
    }

    mapType(type) {
        if(type === 0) {
            return <td>Buy</td>
        }
        return <td>Sell</td>
    }

    cancel(id) {
        OrderService.deleteLimit(id).then(res => {
            if(res.data === true) {
                this.setState({isCanceled: true})
                this.findLimit()
            }
        })
    }

    back() {
        this.props.history.push({
            pathname : `/dashboard/`,
            user: this.state.user
        })
    }

    render() {
        return (
            <div>
                {this.state.isCanceled && <div className="alert alert-warning">Cancel Success!</div>}
                <div className="row">
                    <button className="btn btn-primary" onClick={this.back}>Back</button>
                </div>
                <div className="row">
                    <h2>Limit Orders</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Ticker</th>
                            <th> Company Name</th>
                            <th> Quantity</th>
                            <th> DesiredPrice Price</th>
                            <th> Cost</th>
                            <th> Type</th>
                            <th> Expired Date</th>
                            <th> Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.limitOrders.map(
                                ord =>
                                    <tr key={ord.id}>
                                        <td> {ord.stock.ticker}</td>
                                        <td> {ord.stock.companyName} </td>
                                        <td> {ord.quantity}</td>
                                        <td> {ord.desiredPrice}</td>
                                        <td> {ord.cost}</td>
                                        {this.mapType(ord.type)}
                                        <td>{ord.expiredDate}</td>
                                        <td>
                                            <button style={{marginLeft: "10px"}}
                                                    className="btn btn-info"
                                                    onClick={() => this.cancel(ord.id)}>Cancel
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewLimitOrderComponent
