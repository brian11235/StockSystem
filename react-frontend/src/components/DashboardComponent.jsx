import React, {Component} from 'react'

import ListStockComponent from "./ListStockComponent"
import MarketService from "../services/MarketService"
import UserService from "../services/UserService";

class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.history.location.user.id,
            user: this.props.history.location.user,
            stocks: [],
            marketHours: {
                startTime: '9',
                endTime: '17',
                openDays: 'MON-FRI'
            },
            isMarketClosed: false
        }
        this.logout = this.logout.bind(this)
        this.search = this.search.bind(this)
        this.transfer = this.transfer.bind(this)
        this.statement = this.statement.bind(this)
        this.addTools = this.addTools.bind(this)
        this.addStock = this.addStock.bind(this)
        this.setMarket = this.setMarket.bind(this)
        this.viewLimitOrder = this.viewLimitOrder.bind(this)
    }

    componentDidMount() {
        this.refreshUser()
        this.findMarketHours()
    }

    refreshUser() {
        UserService.getUserById(this.state.userId).then(res => {
            this.setState({user: res.data})
        })
    }

    findMarketHours() {
        let hour = new Date().getHours()
        MarketService.findMarketHours().then(r => {
            if(hour < r.data.startTime
                || hour > r.data.endTime) {
                    this.setState({isMarketClosed: true})
            }
            this.setState({marketHours: r.data})
        })
    }

    search(type) {
        this.props.history.push(`/search`, {
            data: this.state.user,
            order_type: type
        })
    }

    transfer() {
        this.props.history.push(`/transfer`, {
            data: this.state.user
        })
    }

    statement() {
        this.props.history.push(`/statement`, {
            user: this.state.user
        })
    }

    viewLimitOrder() {
        this.props.history.push(`/viewLimit`, {
            user: this.state.user
        })
    }

    addStock() {
        this.props.history.push(`/addStock`, {
            user: this.state.user
        })
    }

    setMarket() {
        this.props.history.push(`/market`, {
            user: this.state.user
        })
    }

    addTools() {
        if (this.state.user.type === 0) {
            return <div className="btn-group-lg" role="group">
                <button type="button"
                        className="btn btn-primary"
                        onClick={() => this.search('0')}
                        disabled={this.state.isMarketClosed}>Buy</button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={() => this.search('1')}
                        disabled={this.state.isMarketClosed}>Sell</button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.transfer}
                        disabled={this.state.isMarketClosed}>Deposit Funds</button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.viewLimitOrder}
                        disabled={this.state.isMarketClosed}>View Limit Orders</button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.statement}>History</button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.logout}>Logout</button>
            </div>
        }
        return <div className="btn-group-lg" role="group">
            <button className="btn btn-primary" onClick={this.addStock}> Add Stock</button>
            <button className="btn btn-primary" onClick={this.setMarket}> Market</button>
            <button className="btn btn-primary" onClick={this.logout}> Logout</button>
        </div>
    }

    ifNeedCash() {
        if(this.state.user.type === 0) {
            return <h3 className="text-left"> Cash : {this.state.user.cash}</h3>
        }
    }

    addListComponent() {
        if(this.state.user.type === 0) {
            return <div className="row">
                <ListStockComponent user={this.state.user}
                                    history={this.props.history}
                                    stocks={this.state.stocks}
                                    id='member'
                                    isMarketClosed={this.state.isMarketClosed}/>
            </div>
        }
        return <div className="row">
            <ListStockComponent user={this.state.user}
                                history={this.props.history}
                                stocks={this.state.stocks}
                                id='admin'
                                isMarketClosed={this.state.isMarketClosed}/>
        </div>
    }

    addMarketHours() {
        if (this.state.isMarketClosed) {
            return <h2>Market Closed</h2>
        }
        return <h2>Trading</h2>
    }

    logout() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        {this.addMarketHours()}
                    </div>
                    <div className="row">
                        {this.addTools()}
                    </div>
                    <div className="row">
                        <div>
                            <h3 className="text-left"> Welcome {this.state.user.userName}</h3>
                            {this.ifNeedCash()}
                        </div>
                    </div>
                    {this.addListComponent()}
                </div>
            </div>
        )
    }
}

export default DashboardComponent