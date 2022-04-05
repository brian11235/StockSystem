import React, {Component} from 'react'
import StockService from '../services/StockService'
import ListStockComponent from "./ListStockComponent";

class SearchStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.history.location.state.data,
            order_type: this.props.history.location.state.order_type,
            stocks: [],
            stockIdentity: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.showStocks = this.showStocks.bind(this);
        this.back = this.back.bind(this);
        this.title = this.title.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    title() {
        if(this.state.order_type === 0) {
            return <h2 className="text-center">Buy Stocks</h2>
        }
        return <h2 className="text-center">Sell Stocks</h2>
    }

    search() {
        StockService.getStockByTickerOrComName(this.state.stockIdentity).then((res) => {
            this.setState({stocks: res.data})
        });
    }

    showStocks() {
        if(this.state.stocks.length != 0) {
            return <ListStockComponent user={this.state.user}
                                       history={this.props.history}
                                       stocks={this.state.stocks}
                                       id='filter'
                                       order_type={this.state.order_type} />;
        }
        return <div></div>;
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
                {() => this.title()}
                <div className="row">
                    <input placeholder="Type" type="text" name="stockIdentity"
                           value={this.state.stockIdentity} onChange={this.handleChange}
                    />
                    <button className="btn btn-primary" onClick={this.search}>Search</button>
                    <button className="btn btn-primary" onClick={this.back}>Back</button>
                </div>
                {this.showStocks()}
                <br></br>
            </div>
        )
    }
}

export default SearchStockComponent
