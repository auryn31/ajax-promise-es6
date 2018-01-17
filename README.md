# Fork to set Timeout to 1 Minute
# ajax-promise-es6
Promise based Ajax module for react/react-native apps.

## Installation:
```npm i -S ajax-promise-es6```

## Usage:

```javascript
// url    : {type: 'string'}
// body   : {type: 'object'} //default null
// headers: {type: 'object', optional: 'true'} //default null
// async: true //default
// timeout: 3 //default 3s

import Ajax from 'ajax-promise-es6'
var ajax = new Ajax();
ajax.post(url).then((res)=> {  
            console.log(res);  
  }).catch((err)=> {
      console.log(err);
  });

Ajax.get(url).then((res)=> {  
            console.log(res);  
  }).catch((err)=> {
      console.log(err);
  });

```

## Example:
```javascript
var ajax = new Ajax();
ajax.post(url,
             {
                foo: 'hello',   // body data
                bar: 'there'
              },
              {
                'Cookie': 'foo=bar'  // headers
              }
    ).then((res)=> {
            // use JSON.parse(res);  
            console.log(res);  
  }).catch((err)=>{
      console.log(err);
  });
```
