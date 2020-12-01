import CGNavBar from '@/components/CGNavBar'
import CGUploadFile from '@/components/CGUploadFile'
import moment from 'moment'

export default function (Vue) {
  Vue.component(CGNavBar.name, CGNavBar)
  Vue.component(CGUploadFile.name, CGUploadFile)
  Vue.filter('formatTime', function (date) {
    const date1 = moment(date)
    let _diff = moment().diff(date1, 'S')
    let result = '刚刚'
    if (_diff > 60) {
      _diff = moment().diff(date1, 'm')
      result = _diff + '分前'
      if (_diff > 60) {
        _diff = moment().diff(date1, 'h')
        result = _diff + '小时前'
        if (_diff > 24) {
          _diff = moment().diff(date1, 'd')
          result = _diff + '天前'
          if (_diff > 31) {
            _diff = moment().diff(date1, 'M')
            result = _diff + '月前'
            if (_diff > 12) {
              _diff = moment().diff(date1, 'Y')
              result = _diff + '年前'
            }
          }
        }
      }
    }
    return result
  })
}
