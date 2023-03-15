const listMapObj = (list) => {
  const obj = {}
  obj[''] = ''
  list.map((item) => (
    obj[item.value] = item.label
  ))
  return obj
}

export const tagList = [{
  label: '不需要驻场',
  value: '不需要驻场'
}, {
  label: '按月结算',
  value: '按月结算'
}, {
  label: '完工结算',
  value: '完工结算'
}]

export const tagObj = listMapObj(tagList)
