const fs = require('fs'); //to read and write files

//get the arguments from the command line
const [,,title,date]=process.argv;
//read the file content and parse it to JSON
const dataString = fs.readFileSync('./ToDo.json', 'utf8'); //read the file
const data = JSON.parse(dataString);
//push the new task to the array
const newToDo = {title,date};
data.push(newToDo);
//write the new array to the file
fs.writeFileSync('./ToDo.json', JSON.stringify(data,null,2));