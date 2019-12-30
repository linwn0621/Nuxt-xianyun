import axios from '@/api/myaxios'
// import axios from 'axios'
export const lunbo = () => {
  return axios({
    url: '/scenics/banners',
  })
}
