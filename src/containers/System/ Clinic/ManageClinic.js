import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic, getAllClinic, editClinicService, deleteClinicService } from '../../../services/userService';
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            arrClinic: [],
            hasOldData: false,
            previewimgURL: '',
            // isOpen: false,
        }
    }

    async componentDidMount() {
        await this.getAllClinicData();
    }

    getAllClinicData = async () => {
        let res = await getAllClinic();
        // console.log('check response:', res)
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file); //encode 
            // console.log('base64 image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewimgURL: objectUrl,
                imageBase64: base64
            })
        }
    }

    handleEditClinic = (clinicInput) => {
        console.log('check clinicInput:', clinicInput)
        this.setState({
            id: clinicInput.id,
            name: clinicInput.name,
            address: clinicInput.address,
            imageBase64: clinicInput.image,
            descriptionHTML: clinicInput.descriptionHTML,
            descriptionMarkdown: clinicInput.descriptionMarkdown,
            hasOldData: true,
            previewimgURL: clinicInput.image,
        })
    }

    handleSaveNewClinic = async () => {
        let { hasOldData } = this.state;
        if (hasOldData === false) {
            let res = await createNewClinic({
                name: this.state.name,
                address: this.state.address,
                image: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success('Adding a new clinic succeeds!')
                await this.getAllClinicData();
                this.setState({
                    name: '',
                    address: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewimgURL: '',
                })
            } else {
                toast.error('Adding a new clinic fails !')
                console.log('check res:', res)
            }
            // console.log('Giang Pham check state:', this.state)
        }

        if (hasOldData === true) {
            let res = await editClinicService({
                id: this.state.id,
                name: this.state.name,
                address: this.state.address,
                image: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success('Editing the clinic succeeds!')
                await this.getAllSpecialtyData();
                this.setState({
                    name: '',
                    address: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewimgURL: '',
                })
            } else {
                toast.error('Edititng the clinic fails!')
                console.log('check res:', res)
            }
        }
    }

    handleDeleteClinic = async (clinic) => {
        // console.log('click delete', clinic)
        try {
            let res = await deleteClinicService(clinic.id);
            if (res && res.errCode === 0) {
                await this.getAllClinicData();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { arrClinic, hasOldData } = this.state

        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'><FormattedMessage id="clinic.manage-clinic" /></div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="clinic.clinic-name" /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="clinic.clinic-picture" /></label>
                        <div className='preview-img-container'>
                            <input id='previewimg' type='file' hidden
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                            <label className='label-upload' htmlFor='previewimg'><FormattedMessage id="clinic.upload-image" /><i className="fas fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewimgURL})` }}
                            >

                            </div>
                        </div>
                    </div>
                    <div className='col-6 form-grouup'>
                        <label><FormattedMessage id="clinic.clinic-address" /></label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className={hasOldData === true ? "btn btn-warning px-3 my-4" : "btn btn-primary px-3 my-4"}
                            onClick={() => this.handleSaveNewClinic()}>

                            {hasOldData === true ?
                                <FormattedMessage id="clinic.edit" />
                                :
                                <FormattedMessage id="clinic.create" />
                            }

                        </button>
                    </div>

                </div>
                <div className='clinic-table mt-3 mx-1'>

                    <table id="customers">
                        <tbody>
                            <tr>
                                <th><FormattedMessage id="clinic.name" /></th>
                                <th><FormattedMessage id="clinic.address" /></th>
                                <th><FormattedMessage id="clinic.action" /></th>
                            </tr>

                            {arrClinic && arrClinic.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditClinic(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteClinic(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>

                    </table>
                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
