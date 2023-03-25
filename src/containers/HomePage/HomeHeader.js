import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/web-logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import LeftNavbar from './LeftNavbar';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }

    handlescroll = (id) => {
        const anchor = document.querySelector(id)
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    handleBurgerNavbar = () => {
        let { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        })
    }

    render() {
        // console.log('check props: ', this.props)
        let language = this.props.language;
        let { isOpen } = this.state;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className={isOpen ? "fas fa-bars" : "fas fa-times"} onClick={() => this.handleBurgerNavbar()}></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                        </div>
                        <LeftNavbar
                            isOpenLeftNavbar={isOpen}
                        />
                        <div className='right-content'>
                            {/* <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id="homeheader.support" /></div> */}
                            <button className='btn-primary btn-login'
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='title2'><FormattedMessage id="banner.title2" /></div>
                            {/* <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Find a medical specialist' />
                            </div> */}
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    // console.log('check state Giang: ', state)
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)) // (language) here can be (data) or any name
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
