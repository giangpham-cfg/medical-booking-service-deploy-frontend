import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader';
import './DetailDoctor.scss';

class DetailDoctor extends Component {
   
    render() {
        console.log(this.props.match.params.id)
        return (
            <>
                <HomeHeader 
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    doctor detail
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
