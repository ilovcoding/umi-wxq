import { get } from "../utils/require";

export function getHistoryMsg(params){
  return get('/api/check/getmsg/paged',params)
}
export function getHistoryMsgCount(params){
  return get('/api/check/msgCount')
}