import * as service from '../service/online'
import { message } from 'antd'
export default {
  //  微信墙相关 设置 数据中心
  namespace: 'online',
  state: {
    // 要实时显示在网页上的消息 
    msgList: [],
    historyMsg: [],
    historyMsgCount: 0
  },
  effects: {
    *setMsgData({ payload }, { call, put, select }) {
      // console.log(payload)
      yield put({
        type: 'setMsgList',
        payload
      })
    },
    *getHistoryMsg({ payload }, { call, put, select }) {
      let res = yield call(service.getHistoryMsg, payload)
      let res_count = yield call(service.getHistoryMsgCount)
      if (res.code !== 2000) { return }
      !res.msg && message.success('获取数据成功')
      let arr = res.data.map(value => ({ ...value, key: value['createTime'] }))
      console.log(res)
      yield put({
        type: 'setData',
        key: 'historyMsg',
        payload: arr
      })
      yield put({
        type: 'setData',
        key: 'historyMsgCount',
        payload: res_count.data
      })
    }
  },
  reducers: {
    setMsgList(state, { payload }) {
      console.log('payload', payload)
      return {
        ...state,
        msgList: payload
      }
    },
    setData(state, { payload, key }) {
      // console.log(key)
      return {
        ...state,
        [key]: payload
      }
    }
  },
  subscriptions: {
  },
};