import React, {Component} from 'react'
import StockService from '../services/StockService'
import ListStockComponent from "./ListStockComponent";
import OrderService from "../services/OrderService";

class StatementComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.history.location.state.user,
            stockOrders: []
        }
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        OrderService.find(this.state.user.id).then((res) => {
            this.setState({stockOrders: res.data})
        })
    }

    mapType(type) {
        if(type === 0) {
            return <td>Buy</td>
        }
        return <td>Sell</td>
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
                <div className="row">
                    <button className="btn btn-primary" onClick={this.back}>Back</button>
                </div>
                <div className="row">
                    <h2>Statement</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Ticker</th>
                            <th> Company Name</th>
                            <th> Quantity</th>
                            <th> Cost</th>
                            <th> Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.stockOrders.map(
                                ord =>
                                    <tr key={ord.id}>
                                        <td> {ord.stock.ticker}</td>
                                        <td> {ord.stock.companyName} </td>
                                        <td> {ord.quantity}</td>
                                        <td> {ord.type === 0 ? -ord.cost : ord.cost}</td>
                                        {this.mapType(ord.type)}
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

export default StatementComponent
