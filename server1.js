// it contain detail of lecture first from 'hello world'
// understanding of os, fs, file import, export 
console.log("server1 is running"); 

var fs=require('fs');
var os=require('os');

var user=os.userInfo();
// console.log(user);
console.log(user.username);
// console.log(os);
// console.log(fs);

// fs.appendFile('path of file'  ,  'data'  ,  callback function); ->
// if file is not existing then it create it otherwise it will append the data inside file
// and it is mandatory to create callback function 
fs.appendFile('greeting.txt','hye '+ user.username + ' !\n', ()=>{console.log('file is created')});

// export and import file ->
const notes=require('./notes.js');
var age=notes.age;
console.log('age is '+ age);
var result=notes.addNumber(age+5,10);
console.log('addition of number is '+result);


// lodash ->
// lodash give multiple inbuild functions which help us to deal with data 
var _ = require('lodash');
var data=['person',1,1,2,3,1,'person','name'];
console.log(_.uniq(data));



const jsonString='{"name": "john", "age": 30, "city": "new york"}';
const jsonObject=JSON.parse(jsonString); // convert JSON string to object
console.log(jsonObject.name); 

const objectToconvert = {name:'Alice', age:26};
const jsonStringField = JSON.stringify(objectToconvert); //convert object to Json string
console.log(jsonStringField);

