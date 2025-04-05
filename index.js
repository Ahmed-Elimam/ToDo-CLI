const { Command } = require('commander');
const program = new Command();
const fs = require("fs");

program.name('To Do Cli').description('CLI to make to do list with CRUD options');

program.command('Add')
.description('Add a new to-do task to the file')
.requiredOption('-t,--title <string>',"title of the toDo task")
.option('-d,--date <string>',"date of the toDo task")
.action(options=>{
    const dataString = fs.readFileSync('./ToDo.json', 'utf8');
    const data = JSON.parse(dataString);
    const lastId=data.length;
    const newToDo = {id:lastId+1,title:options.title,date:options.date};
    data.push(newToDo);
    fs.writeFileSync('./ToDo.json', JSON.stringify(data,null,2));
})

program.command("List")
.description("List the toDo tasks")
.action(()=>{
    const dataString = fs.readFileSync('./ToDo.json','utf8');
    const data = JSON.parse(dataString);
    console.log(data);
})

program.command("Edit")
.description("Edit Entry of toDo task")
.requiredOption("-t,--title <string>","new title of the edited task")
.requiredOption("-i,--id <number>", "Id of the task to be edit")
.option('-d,--date <string>',"new date of the edited task")
.action(options=>{
    const dataString = fs.readFileSync('./ToDo.json', 'utf8');
    const data = JSON.parse(dataString);
    const index = data.findIndex(item=>item.id === Number(options.id));
    if(index == -1){
        console.log("can't find a task with the given id");
        return
    }
    data[index].title = options.title;
    if(options.date){
        data[index].date = options.date;
    }
    fs.writeFileSync('./ToDo.json', JSON.stringify(data,null,2));
})

program.command("Delete")
.description("Delete a task from the ToDo list")
.requiredOption("-i,--id <number>","id of the task to be be deleted")
.action(options=>{
    const dataString = fs.readFileSync('./ToDo.json', 'utf8');
    const data = JSON.parse(dataString);
    const index = data.findIndex(item=>item.id === Number(options.id));
    if(index == -1){
        console.log("can't find a task with the given id");
        return
    }
    data.splice(index,1);
    fs.writeFileSync("./ToDo.json",JSON.stringify(data,null,2));
})
program.parse();