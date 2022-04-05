import React, {Component} from 'react'
import StockService from '../services/StockService';

class CreateStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.history.location.state.user,
            companyName: '',
            ticker: '',
            volume: '',
            price: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {}


    save = (e) => {
        e.preventDefault();
        let stock = {companyName: this.state.companyName,
            ticker: this.state.ticker,
            volume: this.state.volume,
            startPrice: this.state.price};
        StockService.createStock(stock).then(res => {
            this.props.history.push({
                pathname : `/dashboard/`,
                userId: this.state.user.id
            })
        });
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    cancel() {
        this.props.history.push({
            pathname : `/dashboard/`,
            user: this.state.user
        })
    }

    getTitle() {
        return <h3 className="text-center">Add Stock</h3>
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Company Name: </label>
                                        <input placeholder="Company Name" name="companyName" className="form-control"
                                               value={this.state.companyName} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Ticker: </label>
                                        <input placeholder="Ticker" name="ticker" className="form-control"
                                               value={this.state.ticker} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Volume: </label>
                                        <input placeholder="Volume" name="volume" className="form-control"
                                               value={this.state.volume} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Initial Price: </label>
                                        <input placeholder="Initial Price" name="price" className="form-control"
                                               value={this.state.price} onChange={this.handleChange}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.save}>Save
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateStockComponent
