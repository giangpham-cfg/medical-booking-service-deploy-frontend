import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { FormattedDate, FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate)
    }

    getDataPatient = async (user, formattedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        console.log('giang check res:', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formattedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formattedDate)
        })
    }

    handleBtnConfirm = () => {

    }

    handleBtnRemedy = () => {

    }

    render() {
        // console.log('giang check props:', this.state)
        let { dataPatient } = this.state;
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>List</th>
                                    <th>Time</th>
                                    <th>Full name</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypePatient.valueEn}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueEn}</td>
                                                <td>
                                                    <button className='mp-btn-confirm'
                                                        onClick={() => this.handleBtnConfirm}>
                                                        Confirm
                                                    </button>
                                                    <button className='mp-btn-remedy'
                                                        onClick={() => this.handleBtnRemedy}
                                                    >
                                                        Send remedy
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        Have no data
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
