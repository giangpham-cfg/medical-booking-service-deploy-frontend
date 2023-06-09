import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
    // 
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => { //data=this.state(from function 'handleAddNewUser' of ModalUser file) = new value to add to keys of object in db
    return axios.post('/api/create-new-user', data) //data = keys of object in db
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        // headers: {
        //   Authorization: authorizationToken
        // },
        data: {
            id: userId
        }
    });
    // return axios.delete('/api/delete-user', {id: userId})
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}

const deleteSpecialtyService = (specialtyId) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: specialtyId
        }
    });
}

const editSpecialtyService = (inputData) => {
    return axios.put('/api/edit-specialty', inputData)
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const deleteClinicService = (clinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: clinicId
        }
    });
}

const editClinicService = (inputData) => {
    return axios.put('/api/edit-clinic', inputData)
}

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService,
    getDetailInfoDoctor, saveBulkScheduleDoctor,
    getScheduleDoctorByDate, getExtraInfoDoctorById,
    getProfileDoctorById, postPatientBookAppointment,
    postVerifyBookAppointment, createNewSpecialty,
    getAllSpecialty, deleteSpecialtyService,
    editSpecialtyService, getAllDetailSpecialtyById,
    createNewClinic, getAllClinic, deleteClinicService,
    editClinicService, getAllDetailClinicById,
    getAllPatientForDoctor, postSendRemedy
}


