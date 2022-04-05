import React, {Component} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import TransferService from "../services/TransferService";

class TransferCashComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.history.location.state.data,
            fromTitle:'Account',
            toTitle:'Account',
            amount: '',
            fromAccount:{},
            toAccount: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.back = this.back.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.save = this.save.bind(this);
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

    handleSelect(type, evtKey, evt) {
        const acc_id = Number(evtKey)
        const acc = this.state.user.accounts.find(a => a.id === acc_id)
        if(type === 'from') {
            this.setState(
                {
                    fromTitle: evt.target.text,
                    fromAccount: acc
                }
            )
        } else {
            this.setState(
                {
                    toTitle: evt.target.text,
                    toAccount: acc
                }
            )
        }
    }

    save() {
        if (this.state.amount !== '' && this.state.fromAccount.id !== this.state.toAccount.id){
            let transfer = {
                amount: this.state.amount,
                transferDate: new Date().toISOString(),
                fromAccount: this.state.fromAccount,
                toAccount: this.state.toAccount,
                user: this.state.user
            }
            TransferService.transfer(transfer).then(res => {
                this.setState({user: res.data.user})
                this.back()
            });
        }
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
                {this.state.fromAccount.id === this.state.toAccount.id
                    && <div className="alert alert-warning">Same to and from account</div>}
                {this.state.amount === '' && <div className="alert alert-warning">Please input amount</div>}
                <h2 className="text-center">Transfer money</h2>
                <div className="row">
                    <h4 className="left">Current Cash : {this.state.user.cash}</h4>
                </div>
                <div className="row">
                    <input placeholder="cash" type="number" name="amount"
                           value={this.state.amount} onChange={this.handleChange}
                    />
                </div>
                <div className="row">
                    <Dropdown onSelect={(evtKey, evt) =>
                        this.handleSelect("from", evtKey, evt)}>
                        <h4 className="text-left">From</h4>
                        <Dropdown.Toggle variant="success">{this.state.fromTitle}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                this.state.user.accounts.map((acc => {
                                    return(
                                        <Dropdown.Item key={acc.id} eventKey={acc.id}>{acc.accountName}</Dropdown.Item>
                                    )
                                }))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="row">
                    <Dropdown onSelect={(evtKey, evt) =>
                        this.handleSelect("to", evtKey, evt)}>
                        <h4 className="text-left">To</h4>
                        <Dropdown.Toggle variant="success">{this.state.toTitle}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                this.state.user.accounts.map((acc => {
                                    return(
                                        <Dropdown.Item key={acc.id} eventKey={acc.id}>{acc.accountName}</Dropdown.Item>
                                    )
                                }))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.save}>Submit</button>
                    <button className="btn btn-primary" onClick={this.back}>Back</button>
                </div>
                <br></br>
            </div>
        )
    }
}

export default TransferCashComponent
