import React, {Component} from 'react'
import MarketService from "../services/MarketService";

class MarketControlComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.history.location.state.user,
            holiday: [],
            startTime: '',
            endTime: '',
            openDays: '',
            marketHours: []
        }
        this.save = this.save.bind(this);
        this.back = this.back.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        MarketService.findAllHoliday().then((res) => {
            this.setState({holiday : res.data})
        })
        MarketService.findMarketHours().then(r => {
            this.setState({startTime: r.data.startTime,
                endTime: r.data.endTime,
                openDays: r.data.openDays})
        })
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    save() {
        let marketHours = {
            id: 1,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            openDays: this.state.openDays
        }
        MarketService.save(marketHours).then(r => {
            this.back()
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
                <div className="row">
                    <h2>Market Hours</h2>
                    StartTime <input type="number"
                                     name="startTime"
                                     defaultValue={this.state.startTime}
                                     onChange={this.handleChange} />
                    EndTime <input type="number"
                                   name="endTime"
                                   defaultValue={this.state.endTime}
                                   onChange={this.handleChange} />
                </div>
                <div className="row">
                    <h2>Market Schedule</h2>
                    openDays <input type="text"
                                    name="openDays"
                                    defaultValue={this.state.openDays}
                                    onChange={this.handleChange} />
                </div>
                <div className="row">
                    <h2>Holiday</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> id</th>
                            <th> M/D</th>
                            <th> Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.holiday.map(
                                h =>
                                    <tr key={h.id}>
                                        <td> {h.id}</td>
                                        <td> {h.mon}/{h.day} </td>
                                        <td> {h.description}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-success" onClick={this.save}>Submit</button>
                <button className="btn btn-success" onClick={this.back}>back</button>
            </div>
        )
    }
}

export default MarketControlComponent
