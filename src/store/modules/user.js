import Vue from "vue";
import { USER_GET_ROLE } from '../actions.type';
import { USER_SET_ROLE } from '../mutations.type'
import { USER_ROLE }  from '../../consts';

const initialState = () => ({
    userRole: USER_ROLE.guest,
    prevRole: USER_ROLE.guest
})

const state =  initialState();

const getters = {
   userRole: (state) => state.userRole,  
   prevRole: (state) => state.prevRole  
}

const actions = {
    [USER_GET_ROLE]: async (state) => {
      const response =  await Vue.axios.get('/constructor-new/bases/get-user'); 
      const roles = response.data.roles;
      
      let role = USER_ROLE.guest;
      if(roles.length == 2) {
        role = USER_ROLE.printer;              
      }
      if (roles.length == 3) {
        role = USER_ROLE.admin;
      }

      state.commit(USER_SET_ROLE, role)
    },
}

const mutations = {
    [USER_SET_ROLE]: (state, role) => {
        state.prevRole = state.userRole;
        state.userRole = role;
    },
}

export default {
    state, getters, actions, mutations
}

