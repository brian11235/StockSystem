import React, {Component} from 'react'
import StockService from '../services/StockService'
import OrderService from "../services/OrderService";

class OrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.location.state.user,
            stock: this.props.location.state.stock,
            price: this.props.location.state.stock.curPrice,
            order_type: this.props.location.state.order_type,
            timer: [],
            quantity: '',
            cost : '',
            orderFail: false,
            // stockPos:{}
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateCost = this.updateCost.bind(this);
        this.back = this.back.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        // this.findStockPosByUserAndStock()
        this.state.timer = setInterval(() =>
            this.findPrice(this.state.stock.id),
            5000)
    }

    componentWillUnmount() {
        if(this.state.timer != null) {
            clearInterval(this.state.timer);
        }
    }

    // findStockPosByUserAndStock() {
    //     StockService.findStockPosition(this.state.user.id, this.state.stock.id).then(res => {
    //         this.setState({stockPos: res.data})
    //     })
    // }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    updateCost(evt) {
        this.setState(
            {[evt.target.name]: evt.target.value}
        )
        this.setState(
            {cost : (evt.target.value * this.state.price).toFixed(2)}
        )
    }

    findPrice(stock_id) {
        StockService.getStockById(stock_id).then((res) => {
            this.setState({price: res.data.curPrice})
            this.setState(
                {cost : (this.state.quantity * this.state.price).toFixed(2)}
            )
        })
    }

    submit() {
        let order = {
            user: this.state.user,
            stock: this.state.stock,
            quantity: this.state.quantity,
            cost: this.state.cost,
            type: this.state.order_type
        }
        if (this.state.cost <= this.state.user.cash) {
            OrderService.save(order).then((res) => {
                this.props.history.push({
                    pathname : `/dashboard/`,
                    user: this.state.user
                })
            })
        } else {
            this.setState({orderFail: true})
        }
    }

    // calStockPos() {
    //     let stock_pos
    //     if(this.state.order_type === 0) {
    //         stock_pos = {
    //             id: this.state.stockPos.id,
    //             user: this.state.user,
    //             stock: this.state.stock,
    //             quantity: this.state.quantity + this.state.stockPos.quantity === 'undefined' ? 0 : this.state.stockPos.quantity,
    //             avgPrice:
    //                 ((this.state.stockPos.avg * this.state.stockPos.quantity + this.state.cost)
    //                 / (this.state.quantity + this.state.stockPos.quantity)).toFixed(2)
    //         }
    //     } else {
    //         stock_pos = {
    //             id: this.state.stockPos.id,
    //             user: this.state.user,
    //             stock: this.state.stock,
    //             quantity: this.state.stockPos.quantity - this.state.quantity,
    //             avgPrice:
    //                 ((this.state.stockPos.avg * this.state.stockPos.quantity - this.state.cost)
    //                     / (this.state.stockPos.quantity - this.state.quantity)).toFixed(2)
    //         }
    //     }
    //     return stock_pos
    // }

    back() {
        this.props.history.push(`/search`, {
            data : this.state.user,
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
                    <h3 className="text-Left">Estimated Cost</h3>
                    <h5>{this.state.cost}</h5>
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

export default OrderComponent
