import React, { Component } from 'react';
import { connect } from "react-redux";
import './LeftNavbar.scss';
import { FormattedMessage } from 'react-intl';

class LeftNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {

        let { isOpenLeftNavbar } = this.props;

        return (
            <>
                {/* {isOpenLeftNavbar === true && */}
                <div className={`center-content ${isOpenLeftNavbar ? 'show' : ''}`}>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.select-hospital" /></div>
                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.package" /></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                    </div>
                </div>

            </>


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavbar);
