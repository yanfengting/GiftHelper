import axios from 'axios';
export default {
  saveAddress(ctx, address) {
    ctx.commit('saveAddress', address);
  },
  editAddress({ commit }, info) {
    commit('SET_EDITADDRESS_MUTATION', info);
  },
  setAddressList({ commit }) {
    axios.get('/users/addressList').then(
      res => {
        commit('SET_ADDRESSLIST_MUTATION', res.data.result);
      },
      err => {
        console.log(err);
      }
    );
  },
  setUserInfo({ commit }, info) {
    axios.get('/users').then(
      res => {
        commit('SET_USERINFO_MUTATION', res.data.result);
      },
      err => {
        console.log(err);
      }
    );
  }
};
