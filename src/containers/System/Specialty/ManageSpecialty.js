import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty, getAllSpecialty, deleteSpecialtyService, editSpecialtyService } from '../../../services/userService';
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            arrSpecialty: [],
            hasOldData: false,
            //     specialtyEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllSpecialtyData();
    }

    getAllSpecialtyData = async () => {
        let res = await getAllSpecialty();
        // console.log('check response:', res)
        if (res && res.errCode === 0) {
            this.setState({
                arrSpecialty: res.data
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

            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleEditSpecialty = (specialtyInput) => {
        console.log('check specialtyInput:', specialtyInput)
        // let { specialtyEdit } = this.state
        this.setState({
            id: specialtyInput.id,
            name: specialtyInput.name,
            imageBase64: specialtyInput.image,
            descriptionHTML: specialtyInput.descriptionHTML,
            descriptionMarkdown: specialtyInput.descriptionMarkdown,
            hasOldData: true,
        })
    }

    handleSaveNewSpecialty = async () => {
        let { hasOldData } = this.state;
        if (hasOldData === false) {
            let res = await createNewSpecialty({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success('Adding a new specialty succeeds!')
                await this.getAllSpecialtyData();
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                })
            } else {
                toast.error('Adding a new specialty fails !')
                console.log('check res:', res)
            }
            // console.log('Giang Pham check state:', this.state)
        }

        if (hasOldData === true) {
            let res = await editSpecialtyService({
                id: this.state.id,
                name: this.state.name,
                image: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success('Editing the specialty succeeds!')
                await this.getAllSpecialtyData();
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                })
            } else {
                toast.error('Edititng the specialty fails!')
                console.log('check res:', res)
            }
        }
    }

    handleDeleteSpecialty = async (specialty) => {
        // console.log('click delete', specialty)
        try {
            let res = await deleteSpecialtyService(specialty.id);
            if (res && res.errCode === 0) {
                await this.getAllSpecialtyData();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { arrSpecialty, hasOldData } = this.state

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control-file' type='file' key={this.state.inputKey}
                            onChange={(event) => this.handleOnchangeImage(event)}
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
                        {/* <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
                        >Lưu</button> */}
                        <button className={hasOldData === true ? "btn btn-warning px-3 my-4" : "btn btn-primary px-3 my-4"}
                            onClick={() => this.handleSaveNewSpecialty()}>

                            {hasOldData === true ?
                                <FormattedMessage id="specialty.edit" />
                                :
                                <FormattedMessage id="specialty.create" />
                            }

                        </button>
                    </div>

                </div>
                <div className='specialty-table mt-3 mx-1'>

                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>

                            {arrSpecialty && arrSpecialty.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditSpecialty(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteSpecialty(item)}><i className="fas fa-trash"></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
