const reg = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  username: /^[a-zA-Z]\w{5,17}/,
  password: /^(\w){6,20}$/,
  nickname: /^.{1,17}$/,
  name: /^.{1,17}$/,
  number: /^([1-9]+(\.\d+)?|0\.\d+)$/
};

export function genValidator(prop, show, optional = false) {
  return function (rule, value, callback) {
    if (optional && !value) {
      callback();
    } else if (value === '') {
      callback(new Error(`请输入${show}`));
    } else if (!reg[prop].test(value)) {
      callback(new Error(`${show}不合法`));
    } else {
      callback();
    }
  }
}
