Page({ 
  data: {
     id1: "back", 
     id2: "clear", 
     id3: "negative", 
     id4: "+", 
     id5: "9", 
     id6: "8", 
     id7: "7", 
     id8: "-", 
     id9: "6", 
     id10: "5", 
     id11: "4", 
     id12: "x", 
     id13: "3", 
     id14: "2", 
     id15: "1", 
     id16: "÷", 
     id17: "0", 
     id18: ".", 
     id19: "history", 
     id20: "=", 
     id21: "sin", 
     id22: "cos", 
     id23: "tan", 
     id24: "√", 
     id25: "lg", 
     id26: "^", 
     id27: "(", 
     id28: ")", 
     id29: "^(-1)", 
     id30: "%", 
     id31: "ln", 
     id32:"asin",
     id33:"acos",
     id34:"atan",
     id35:"π",
     id36:"MS",
     id37:"MR",
     id38:"MC",
     screenData: "0", 
     lastIsOpt: false, 
     arr: [], 
     logs: [],
     bracketLevel:0,
     memory:"",
     },
      clickButton: function (event) { 
        console.log(event.target.id); 
        var id = event.target.id; 
        var newdata; 
        var sd = this.data.screenData;
        if (id == this.data.id1) { 
            if ('0' == sd) return; 
            newdata = sd.substring(0, sd.length - 1); 
            if ("-" == newdata || "" == newdata) newdata = "0"; 
            this.data.arr.pop(); 
        } else if (id == this.data.id2) { 
            newdata = "0"; 
            this.data.arr.length = 0; 
          } else if (id == this.data.id3) { 
            if ("0" == sd) return; 
            var fstChar = sd.substring(0, 1); 
            if ('-' == fstChar) { 
              newdata = sd.substring(1, sd.length); 
              this.data.arr.shift(); 
            } else { 
              newdata = "-" + sd; 
              this.data.arr.unshift('-'); 
            } 
        } else if (id == this.data.id20) { 
          if ('0' == sd) return; 
          if (true == this.data.lastIsOpt) return; 
          var arr = this.data.arr; 
          var optarr = []; 
          var num = ""; 
  
  for (var i in arr) { 
    if (false == isNaN(arr[i]) || arr[i] == this.data.id18 || arr[i] == this.data.id3) { 
      num += arr[i]; 
    } else { 
      optarr.push(num); 
      optarr.push(arr[i]); 
      num = ""; 
    } 
  } 
  
  optarr.push(num); 
  var result = Number(optarr[0]) * 1.0; 
  
  for (var i = 1; i < optarr.length; i++) { 
    if (true == isNaN(optarr[i])) { 
      if (optarr[i] == this.data.id4) { 
        result += Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id8) { 
        result -= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id12) { 
        result *= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id16) { 
        result /= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id26) { 
        result = Math.pow(result, Number(optarr[i + 1])); 
      } else if(optarr[i] == this.data.id30){
        result %= Number(optarr[i+1]);
      }else if(optarr[i] == this.data.id29){
        result = 1/result;
      }else if(optarr[i]== this.data.id31){
        result = Math.log(Number(optarr[i+1]))
      }else if(optarr[i]== this.data.id25){
        result = Math.log10(Number(optarr[i+1]))
      }else if (optarr[i] == this.data.id21) { 
        result = Math.sin(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id22) { 
        result = Math.cos(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id23) { 
        result = Math.tan(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id32) { 
        result = Math.asin(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id33) { 
        result = Math.acos(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id34) { 
        result = Math.atan(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id24) { 
        result = Math.sqrt(Number(optarr[i+1])); 
      } else if (optarr[i] == this.data.id36) { 
        this.data.memory=sd; 
      } else if (optarr[i] == this.data.id37) { 
        result = this.data.memory;
        this.data.arr = this.data.memory.split("");
      } else if(optarr[i]==this.data.id38){
        this.data.memory="";
      }
    } 
  } 
  
  this.data.arr.length = 0; 
  this.data.arr.push(result); 
  newdata = result; 
  var nowlog = sd + "=" + result; 
  this.data.logs.push(nowlog); 
  wx.setStorageSync('calcu-logs', this.data.logs); 
  const db = wx.cloud.database();
      db.collection('calculation').add({
        data: {
          formula: sd,
          result: result
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (err) {
          console.error(err);
        }
      });
} else if (id == this.data.id21 || id == this.data.id22 || id == this.data.id23) { 
  if ('0' == sd) return; 
  if (true == this.data.lastIsOpt) return; 
  var arr = this.data.arr; 
  var optarr = []; 
  var num = ""; 
  
  for (var i in arr) { 
    if (false == isNaN(arr[i]) || arr[i] == this.data.id18 || arr[i] == this.data.id3) { 
      num += arr[i]; 
    } else { 
      optarr.push(num); 
      optarr.push(arr[i]); 
      num = ""; 
    } 
  } 
  
  optarr.push(num); 
  var result = Number(optarr[0]) * 1.0; 
  
  for (var i = 1; i < optarr.length; i++) { 
    if (true == isNaN(optarr[i])) { 
      if (optarr[i] == this.data.id4) { 
        result += Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id8) { 
        result -= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id12) { 
        result *= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id16) { 
        result /= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id26) { 
        result = Math.pow(result, Number(optarr[i + 1])); 
      } else if(optarr[i]==this.data.id30){
        result=Number(optarr[i+1]) % Number(optarr[i+2]);
      } else if(optarr[i] == this.data.id29){
        result = 1/result;
      }else if(optarr[i]== this.data.id31){
        result = Math.log(Number(optarr[i+1]))
      }else if(optarr[i]== this.data.id25){
        result = Math.log10(Number(optarr[i+1]))
      }else if (optarr[i] == this.data.id21) { 
        result = Math.sin(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id22) { 
        result = Math.cos(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id23) { 
        result = Math.tan(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id32) { 
        result = Math.asin(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id33) { 
        result = Math.acos(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id34) { 
        result = Math.atan(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      }else if (optarr[i] == this.data.id24) { 
        result = Math.sqrt(Number(optarr[i+1])); 
      } else if (optarr[i] == this.data.id36) { 
        this.data.memory=sd; 
      } else if (optarr[i] == this.data.id37) { 
        result = this.data.memory;
        this.data.arr = this.data.memory.split("");
      } else if(optarr[i]==this.data.id38){
        this.data.memory="";
      }
    } 
  } 
  
  // var angle = result; 

  // if (id === this.data.id21) { 
  //   result = Math.sin(angle * Math.PI / 180); 
  // } else if (id === this.data.id22) { 
  //   result = Math.cos(angle * Math.PI / 180); 
  // } else if (id === this.data.id23) { 
  //   result = Math.tan(angle * Math.PI / 180); 
  // } 
  
  this.data.arr.length = 0; 
  this.data.arr.push(result); 
  newdata = result; 
  var nowlog = sd + "=" + result; 
  this.data.logs.push(nowlog); 
  wx.setStorageSync('calcu-logs', this.data.logs); 
  const db = wx.cloud.database();
      db.collection('calculation').add({
        data: {
          formula: sd,
          result: result
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (err) {
          console.error(err);
        }
      });
} else if (id == this.data.id24) { 
  if ('0' == sd) return; 
  if (true == this.data.lastIsOpt) return; 
  var arr = this.data.arr; 
  var optarr = []; 
  var num = ""; 
  
  for (var i in arr) { 
    if (false == isNaN(arr[i]) || arr[i] == this.data.id18 || arr[i] == this.data.id3) { 
      num += arr[i]; 
    } else { 
      optarr.push(num); 
      optarr.push(arr[i]); 
      num = ""; 
    } 
  } 
  
  optarr.push(num); 
  var result = Number(optarr[0]) * 1.0; 
  
  for (var i = 1; i < optarr.length; i++) { 
    if (true == isNaN(optarr[i])) { 
      if (optarr[i] == this.data.id4) { 
        result += Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id8) { 
        result -= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id12) { 
        result *= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id16) { 
        result /= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id26) { 
        result = Math.pow(result, Number(optarr[i + 1])); 
      } else if(optarr[i]==this.data.id30){
        result %= Number(optarr[i+1]);
      }else if(optarr[i] == this.data.id29){
        result = 1/result;
      }else if(optarr[i]== this.data.id31){
        result = Math.log(Number(optarr[i+1]))
      }else if(optarr[i]== this.data.id25){
        result = Math.log10(Number(optarr[i+1]))
      }else if (optarr[i] == this.data.id21) { 
        result = Math.sin(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id22) { 
        result = Math.cos(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id23) { 
        result = Math.tan(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id32) { 
        result = Math.asin(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id33) { 
        result = Math.acos(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id34) { 
        result = Math.atan(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      }else if (optarr[i] == this.data.id24) { 
        result = Math.sqrt(Number(optarr[i+1])); 
      } else if (optarr[i] == this.data.id36) { 
        this.data.memory=sd; 
      } else if (optarr[i] == this.data.id37) { 
        result = this.data.memory;
        this.data.arr = this.data.memory.split("");
      } else if(optarr[i]==this.data.id38){
        this.data.memory="";
      }
    } 
  } 
  
  result = Math.sqrt(result); 
  this.data.arr.length = 0; 
  this.data.arr.push(result); 
  newdata = result; 
  var nowlog = sd + "=" + result; 
  this.data.logs.push(nowlog); 
  wx.setStorageSync('calcu-logs', this.data.logs); 
  const db = wx.cloud.database();
      db.collection('calculation').add({
        data: {
          formula: sd,
          result: result
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (err) {
          console.error(err);
        }
      });
} else if (id == this.data.id25) { 
  if ('0' == sd) return; 
  if (true == this.data.lastIsOpt) return; 
  var arr = this.data.arr; 
  var optarr = []; 
  var num = ""; 
  
  for (var i in arr) { 
    if (false == isNaN(arr[i]) || arr[i] == this.data.id18 || arr[i] == this.data.id3) { 
      num += arr[i]; 
    } else { 
      optarr.push(num); 
      optarr.push(arr[i]); 
      num = ""; 
    } 
  } 
  
  optarr.push(num); 
  var result = Number(optarr[0]) * 1.0; 
  
  for (var i = 1; i < optarr.length; i++) { 
    if (true == isNaN(optarr[i])) { 
      if (optarr[i] == this.data.id4) { 
        result += Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id8) { 
        result -= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id12) { 
        result *= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id16) { 
        result /= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id26) { 
        result = Math.pow(result, Number(optarr[i + 1])); 
      } else if(optarr[i]==this.data.id30){
        result%=Number(optarr[i+1])
      }else if(optarr[i] == this.data.id29){
        result = 1/result;
      }else if(optarr[i]== this.data.id31){
        result = Math.log(Number(optarr[i+1]))
      }else if(optarr[i]== this.data.id25){
        result = Math.log10(Number(optarr[i+1]))
      }else if (optarr[i] == this.data.id21) { 
        result = Math.sin(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id22) { 
        result = Math.cos(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id23) { 
        result = Math.tan(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id32) { 
        result = Math.asin(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id33) { 
        result = Math.acos(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id34) { 
        result = Math.atan(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      }else if (optarr[i] == this.data.id24) { 
        result = Math.sqrt(Number(optarr[i+1])); 
      } else if (optarr[i] == this.data.id36) { 
        this.data.memory=sd; 
      } else if (optarr[i] == this.data.id37) { 
        result = this.data.memory;
        this.data.arr = this.data.memory.split("");
      } else if(optarr[i]==this.data.id38){
        this.data.memory="";
      }
    } 
  } 
  // result = Math.log10(result); 
  this.data.arr.length = 0; 
  this.data.arr.push(result); 
  newdata = result; 
  var nowlog = sd + "=" + result; 
  this.data.logs.push(nowlog); 
  wx.setStorageSync('calcu-logs', this.data.logs); 
  const db = wx.cloud.database();
      db.collection('calculation').add({
        data: {
          formula: sd,
          result: result
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (err) {
          console.error(err);
        }
      });
} else if (id == this.data.id27) { 
  if ('0' == sd) { 
    newdata = event.target.id; 
  } else { 
    newdata = sd + event.target.id; 
  } 
  
  this.data.arr.push(event.target.id); 
} else if (id == this.data.id28) { 
  if ('0' == sd) return; 
  if (true == this.data.lastIsOpt) return; 
  var arr = this.data.arr; 
  var optarr = []; 
  var num = ""; 
  
  for (var i in arr) { 
    if (false == isNaN(arr[i]) || arr[i] == this.data.id18 || arr[i] == this.data.id3) { 
      num += arr[i]; 
    } else { 
      optarr.push(num); 
      optarr.push(arr[i]); 
      num = ""; 
    } 
  } 
  
  optarr.push(num); 
  var result = Number(optarr[0]) * 1.0; 
  
  for (var i = 1; i < optarr.length; i++) { 
    if (true == isNaN(optarr[i])) { 
      if (optarr[i] == this.data.id4) { 
        result += Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id8) { 
        result -= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id12) { 
        result *= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id16) { 
        result /= Number(optarr[i + 1]); 
      } else if (optarr[i] == this.data.id26) { 
        result = Math.pow(result, Number(optarr[i + 1])); 
      } else if(optarr[i]==this.data.id30){
        result %= Number(optarr[i+1]);
      }else if(optarr[i] == this.data.id29){
        result = 1/result;
      }else if(optarr[i]== this.data.id31){
        result = Math.log(Number(optarr[i+1]))
      }else if(optarr[i]== this.data.id25){
        result = Math.log10(Number(optarr[i+1]))
      }else if (optarr[i] == this.data.id21) { 
        result = Math.sin(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id22) { 
        result = Math.cos(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id23) { 
        result = Math.tan(Number(optarr[i+1]) * Math.PI / 180); 
      } else if (optarr[i] == this.data.id32) { 
        result = Math.asin(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id33) { 
        result = Math.acos(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      } else if (optarr[i] == this.data.id34) { 
        result = Math.atan(Number(optarr[i+1]))*(180/Math.PI)+'°'; 
      }else if (optarr[i] == this.data.id24) { 
        result = Math.sqrt(Number(optarr[i+1])); 
      } else if (optarr[i] == this.data.id36) { 
        this.data.memory=sd; 
      } else if (optarr[i] == this.data.id37) { 
        result = this.data.memory;
        this.data.arr = this.data.memory.split("");
      } else if(optarr[i]==this.data.id38){
        this.data.memory="";
      }
    } 
  } 
  
  result = "(" + result + ")"; 
  this.data.arr.length = 0; 
  this.data.arr.push(result); 
  newdata = result; 
  var nowlog = sd + "=" + result; 
  this.data.logs.push(nowlog); 
  wx.setStorageSync('calcu-logs', this.data.logs); 
}
    else{
      if(id==this.data.id4 || id==this.data.id8 || id==this.data.id12 || id==this.data.id16){
        if(true==this.data.lastIsOpt || '0'==sd){
          return ;
        }
        this.data.lastIsOpt=true;
      }
      else{
        this.data.lastIsOpt=false;
      }
      if ('0' == sd) {
        newdata = event.target.id;
      } else {
        newdata = sd + event.target.id;
      }
      this.data.arr.push(event.target.id);
    }
    this.setData({ screenData: newdata});
  },
  history:function() {
    wx.navigateTo({
      url: '../list/list',
    })
  }
})
