import React, {Component} from 'react'
import StockService from '../services/StockService'
import authService from "../services/AuthService";

class ListStockComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            user: this.props.user,
            stocks: this.props.stocks,
            order_type: this.props.order_type,
            investing: '',
            timer: [],
            isMarketClosed: false,
            stock_pos: this.props.user.stockPositions
        }

        this.logout = this.logout.bind(this)
        this.opButton = this.opButton.bind(this)
        this.orderStock = this.orderStock.bind(this)
        this.limitOrderStock = this.limitOrderStock.bind(this)
    }

    componentDidMount() {
        if (!this.state.isMarketClosed) {
            this.findPrice()
        } else {
            this.findStockPosition()
        }
    }

    findPrice() {
        let ids = []
        this.state.stocks.map(
            s => ids.push(s.id)
        )
        this.refresh(ids)
    }

    refresh(ids) {
        if (this.state.user.type === 0 && this.state.id !== 'filter') {
            this.state.timer = setInterval(() => this.findStockPosition(),
                5000)
        } else if (this.state.user.type === 1) {
            this.state.timer = setInterval(() => this.findAllStocks(),
                5000)
        } else {
            this.state.timer = setInterval(() => this.findPriceByIds(ids),
                5000)
        }
    }

    findAllStocks() {
        StockService.getAllStocks().then((res) => {
            this.setState({stockPos: res.data})
        })
    }

    findPriceByIds(ids) {
        StockService.getStockByIds(ids).then((res) => {
            this.setState({stocks: res.data})
        })
    }

    findStockPosition() {
        StockService.findStockPosition(this.state.user.id).then(res => {
            this.setState({stock_pos: res.data})
        })
        let invest = new Number()
        this.state.stock_pos.map(
            s => invest += (s.stock.curPrice * s.quantity)
        )
        this.setState({investing: invest.toFixed(2)})
    }

    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer)
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.stocks != nextProps.stocks) {
            this.setState({stocks: nextProps.stocks})
        }
    }

    opButton(id, ticker) {
        if (this.state.id === 'filter') {
            if (this.state.order_type === '0') {
                return <div>
                    <button style={{marginLeft: "10px"}}
                            onClick={() => this.orderStock(id, ticker)}
                            className="btn btn-info">Buy
                    </button>
                    <button style={{marginLeft: "10px"}}
                            onClick={() => this.limitOrderStock(id, ticker)}
                            className="btn btn-info">Buy Limit
                    </button>
                </div>
            } else {
                return <div>
                    <button style={{marginLeft: "10px"}}
                            onClick={() => this.orderStock(id, ticker)}
                            className="btn btn-info">Sell
                    </button>
                    <button style={{marginLeft: "10px"}}
                            onClick={() => this.limitOrderStock(id, ticker)}
                            className="btn btn-info">Sell Limit
                    </button>
                </div>
            }
        }
    }

    orderStock(stock) {
        this.props.history.push({
                pathname: `/order`,
                state: {
                    user: this.state.user,
                    stock: stock,
                    order_type: this.state.order_type
                }
            }
        )
    }

    limitOrderStock(stock) {
        this.props.history.push({
                pathname: `/orderLimit`,
                state: {
                    user: this.state.user,
                    stock: stock,
                    order_type: this.state.order_type
                }
            }
        )
    }

    addGrid() {
        if (this.state.user.type === 0 && this.state.id !== 'filter') {
            return <div className="row">
                <h2>Investing {this.state.investing}</h2>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th> Ticker</th>
                        <th> Company Name</th>
                        <th> quantity</th>
                        <th> Avg Cost</th>
                        <th> curValue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.stock_pos.map(
                            sp =>
                                <tr key={sp.id}>
                                    <td> {sp.stock.ticker}</td>
                                    <td> {sp.stock.companyName} </td>
                                    <td> {sp.quantity}</td>
                                    <td> {sp.avgPrice}</td>
                                    <td> {sp.stock.curPrice}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        }
        return <div className="row">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th> Ticker</th>
                    <th> Company Name</th>
                    <th> Volume</th>
                    <th> Price</th>
                    <th> Capitalization</th>
                    <th> Open</th>
                    <th> High</th>
                    <th> Low</th>
                    <th> Operation</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.stocks.map(
                        stock =>
                            <tr key={stock.id}>
                                <td> {stock.ticker}</td>
                                <td> {stock.companyName} </td>
                                <td> {stock.volume}</td>
                                <td> {stock.curPrice}</td>
                                <td> {stock.volume * stock.curPrice}</td>
                                <td> {stock.startPrice}</td>
                                <td> {stock.highPrice}</td>
                                <td> {stock.lowPrice}</td>
                                <td>
                                    {this.opButton(stock)}
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    }

    logout() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Stocks List</h2>
                <br></br>
                {this.addGrid()}
            </div>
        )
    }
}

export default ListStockComponent
