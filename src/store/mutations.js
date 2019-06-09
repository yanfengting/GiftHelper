import * as types from './mutations-types';

const mutations = {
  [types.SET_GOOD_MUTATION](state, payload) {
    state.good = payload;
  },
  [types.SET_ORDERGOOD_MUTATION](state, payload) {
    state.orderGood = payload;
  },
  [types.SET_ADDRESSLIST_MUTATION](state, payload) {
    state.addressList = payload;
  },
  [types.SET_EDITADDRESS_MUTATION](state, payload) {
    state.editAddressInfo = payload;
  },
  [types.SET_ADDRESSID_MUTATION](state, payload) {
    state.addressId = payload;
  },
  // 获取用户列表
  [types.SET_USERINFO_MUTATION](state, payload) {
    state.userInfo = payload;
  },
  // 保存
  saveAddress(state, address) {
    state.address.push(address);
  },
  // 删除
  removeAddress(state, idx) {
    state.address.splice(idx, 1);
  },
  // 修改
  editAddress(state, payload) {
    console.log(payload);
    state.address.splice(payload.idx, 1, payload.data);
  }
};

export default mutations;
