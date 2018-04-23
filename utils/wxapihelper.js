let nullFn = () => {
};
let IllegalAPIException = (name) => {
  this.message = "No Such API [" + name + "]";
  this.name = 'IllegalAPIException';
};
let wxrequest = (args, isloading, resolve, reject) => {
  if (args.statusCode == 200) {
    if (isloading == true) {
      wx.hideLoading();
    }
    var ResultCode = [args, 0][0].data.ResultCode;
    if (ResultCode == "000") {
      resolve(args);
    }
    else {
      reject(args);
    }
  }
  else {
    if (isloading == true) {
      wx.hideLoading();
    }
    reject(args);
  }
};
let services = {
  sleep: (time) => {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time);
    })
  },
  stop: () => {
    return new Promise(function (resolve, reject) {
    })
  },
  taskSequence: () => {
    return new Promise(function (resolve, reject) {
      resolve()
    })
  }
};
export let pro = new Proxy(services, {
  get: function (target, property) {
    if (property in target) {
      return target[property];
    } else if (property in wx) {
      return (obj) => {
        return new Promise(function (resolve, reject) {
          obj = obj || {};
          if (obj.isloading == true) {
            wx.showLoading();
          }
          obj.success = (...args) => {
            switch (property) {
              case "request":
                wxrequest(...args, obj.isloading, resolve, reject)
                break;
              default:
                if (obj.isloading == true) {
                  wx.hideLoading();
                }
                resolve(...args);
            }
          };
          obj.fail = (...args) => {
            if (obj.isloading == true) {
              wx.hideLoading();
            }
            reject(...args);
          };
          obj.complete = nullFn;
          wx[property](obj);
        });
      }
    } else {
      throw new IllegalAPIException(property);
    }
  }
});