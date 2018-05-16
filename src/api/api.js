/**
 * @flow
 */


import { fetchSystem } from "../utils/common"

const HAHAURL = 'http://www.haha.mx/mobile_app_data_api.php'

const fetchAPI = async (params) => await fetchSystem(HAHAURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: params,
})

const transformBody = (params) => {
  const strArr = []
  for(let i in params){
    strArr.push(`${i}=${params[i]}`)
  }
  return strArr.join('&')
}

type Types = 'web_good' | 'new' | 'pic' | 'text'

export const getJokeList = async ({
                                    type = 'web_good',
                                    page = 1,
                                  }: {
  type: Types,
  page: number,
}) => {
  return await fetchAPI(transformBody({
    r: 'joke_list',
    offset: 20,
    drive_info: '6b1158df46aa638698cbf1290db1238875f80000', //设备信息
    page,
    type,
  }))
}