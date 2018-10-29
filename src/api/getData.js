import {HOST_URL} from '@/api/hotsurl'
import axios from 'axios'

/*登入接口*/
export function login(data) {

  return axios.post(HOST_URL + 'admin/login',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (datas) {
      let ret = ''
      for (let it in datas) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
      }
      return ret
    }]
  }).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
     alert('系统错误')
  })
}

/*游戏列表*/

export  function gameList(data) {
   return axios.post(HOST_URL + 'game/cumulative/list',data,{
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     transformRequest: [function (datas) {
       let ret = ''
       for (let it in datas) {
         ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
       }
       return ret
     }]
   }).then((res)=>{
     return Promise.resolve(res)
   }).catch((res)=>{
     alert('系统错误')
   })
}


/*游戏搜索功能*/
export function search(data) {
  return axios.post(HOST_URL + '/game/search',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (datas) {
      let ret = ''
      for (let it in datas) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
      }
      return ret
    }]
  }).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}


/*获取游戏详情*/
export function gameDetails(gameKey) {
 return axios.get(HOST_URL + '/game/info?gameKey='+ gameKey).then((res)=>{
   return Promise.resolve(res)
 }).catch((res)=>{
   alert('系统错误')
 })
}


/*添加游戏接口*/
export function addGame(data) {
  return axios.post(HOST_URL + '/game/add',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (datas) {
      let ret = ''
      for (let it in datas) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
      }
      return ret
    }]
  }).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}


/*游戏保存*/
export  function gameEditor(data) {
  return axios.post(HOST_URL + '/game/info/save/edit',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (datas) {
      let ret = ''
      for (let it in datas) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
      }
      return ret
    }]
  }).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}


/*用户管理数据统计*/
export  function UserAllData(gameKey) {
  return axios.get(HOST_URL + '/game/statistics').then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}
/*数据统计*/
export  function getAllData(gameKey) {
  return axios.get(HOST_URL + '/game/statistics?gameKey=' + gameKey).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}


/*用户查询列表*/
export function userList(data) {
  return axios.get(HOST_URL + '/game/player/detail',{
    params:data
  }).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}


/*注册渠道*/
export  function getChannel() {
  return axios.get(HOST_URL + '/game/list').then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}



/*用户管理(游戏玩家信息编辑)*/
export function submitEdit(data) {
 return axios.post(HOST_URL + '/game/player/edit',data,{
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   },
   transformRequest: [function (datas) {
     let ret = ''
     for (let it in datas) {
       ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
     }
     return ret
   }]
 }).then((res)=>{
   return Promise.resolve(res)
 }).catch((res)=>{
   alert('系统错误')
 })
}


/*用户管理(添加游戏玩家)*/
export function addUser(data) {
  return axios.post(HOST_URL + '/game/player/add',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (datas) {
      let ret = ''
      for (let it in datas) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(datas[it]) + '&'
      }
      return ret
    }]
  }).then((res)=>{
    return Promise.resolve(res)
  }).catch((res)=>{
    alert('系统错误')
  })
}
