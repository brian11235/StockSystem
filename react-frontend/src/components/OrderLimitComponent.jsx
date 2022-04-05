import React, {Component} from 'react'
import StockService from '../services/StockService'
import OrderService from "../services/OrderService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class OrderLimitComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.location.state.user,
            stock: this.props.location.state.stock,
            curPrice: this.props.location.state.stock.curPrice,
            order_type: this.props.location.state.order_type,
            desiredPrice: '',
            expiredDate: new Date(),
            timer: [],
            quantity: '',
            cost: '',
            orderFail: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateCost = this.updateCost.bind(this);
        this.back = this.back.bind(this);
        this.submit = this.submit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.state.timer = setInterval(() =>
                this.findPrice(this.state.stock.id),
            5000)
    }

    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer);
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleDateChange = (date, event) => {
        this.setState({expiredDate: date})
    }

    updateCost(evt) {
        this.setState(
            {[evt.target.name]: evt.target.value}
        )
        if (evt.target.name === 'quantity') {
            this.setState({cost: (evt.target.value * this.state.desiredPrice).toFixed(2)})
        } else {
            this.setState({cost: (evt.target.value * this.state.quantity).toFixed(2)})
        }
    }

    findPrice(stock_id) {
        StockService.getStockById(stock_id).then((res) => {
            this.setState({price: res.data.curPrice})
        })
    }

    submit() {
        // if((this.state.type === 0 && this.state.cost > this.state.user.cash) ||
        //     this.state.type === 1 && this.state.user.) {
        //
        // }
        let order = {
            user: this.state.user,
            stock: this.state.stock,
            desiredPrice: this.state.desiredPrice,
            expiredDate: this.state.expiredDate,
            quantity: this.state.quantity,
            cost: this.state.cost,
            type: this.state.order_type
        }
        if (this.state.cost <= this.state.user.cash) {
            OrderService.saveLimit(order).then((res) => {
                this.props.history.push({
                    pathname: `/dashboard/`,
                    user: this.state.user
                })
            })
        } else {
            this.setState({orderFail: true})
        }
    }

    back() {
        this.props.history.push(`/search`, {
            data: this.state.user,
            order_type: this.state.order_type
        })
    }

    render() {
        return (
            <div>
                {this.state.orderFail && <div className="alert alert-warning">Invalid Order</div>}
                <div className="row">
                    <h2 className="text-Left">{this.state.type} {this.state.stock.ticker}</h2>
                </div>
                <div className="row">
                    <h5>${this.state.user.cash} available</h5>
                </div>
                <div className="row">
                    <h3 className="text-Left">Number of Shares</h3>
                    <input placeholder="0" type="number" name="quantity"
                           value={this.state.quantity} onChange={evt => this.updateCost(evt)}
                    />
                </div>
                <div className="row">
                    <h3 className="text-Left">Market Price</h3>
                    <h5>{this.state.price}</h5>
                </div>
                <div className="row">
                    <h3 className="text-Left">Desired Price</h3>
                    <input placeholder="0" type="number" name="desiredPrice"
                           value={this.state.desiredPrice} onChange={evt => this.updateCost(evt)}
                    />
                </div>
                <div className="row">
                    <h3 className="text-Left">Estimated Cost</h3>
                    <h5>{this.state.cost}</h5>
                </div>
                <div className="row">
                    <h3 className="text-Left">Expired Date</h3>
                    <DatePicker id="datePicker"
                                selected={this.state.expiredDate}
                                minDate={this.state.expiredDate}
                                onChange={this.handleDateChange}/>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.submit}>Submit</button>
                    <button className="btn btn-primary" onClick={this.back}>Back</button>
                </div>
                <br></br>
            </div>
        )
    }
}

export default OrderLimitComponent
