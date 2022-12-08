import axios from '../axios'
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email, password}); 
    // 
}

const getAllUsers = (inputId) =>{
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

export { 
    handleLoginApi, getAllUsers, 
    createNewUserService, deleteUserService, 
    editUserService 
} 