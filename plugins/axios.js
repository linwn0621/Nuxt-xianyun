// 登录错误拦截
import {Message} from 'element-ui'
export default ({$axios}) => {
  
  $axios.onError(err=>{
    // 拦截axios错误
      if(err.response.data.statusCode===400){
        let message=err.response.data.message
          Message.warning({message});
      }
  })

}