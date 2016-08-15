var money = 40;
var problem = 2.5;

function Employee (productivity,salary) {
	this.productivity = productivity;
	this.salary = salary;
	this.contracted = false;
	this.next = null;
}
function Path(empList) {
	this.productivity = 0;
	this.remaining = money;
	this.average = 0;
	this.empList = empList;
	this.stateSet = [0,0,0,0];
}

var employeeList = {
	productivity : 0.0,
	salary : 0,
	contracted : false,
	next : null,
}
//function recursion(pathsList,empList,remaining,productivity){
// Recursions works on the first path in the list
function recursion(pathsList){
	
	if(pathsList[0].productivity >= problem){
		return pathsList[0].stateSet;
	}
	if(pathsList[0].empList.length == 0){
		pathsList.shift();
		return recursion(pathsList);
	}
	path1 = fNextState1(pathsList[0]);
	path0 = fNextState0(pathsList[0]);

	pathsList.shift();
	//push the news paths
	sortPush(path0,pathsList);
	if(path1 != "error"){
		sortPush(path1,pathsList);
	}
	return recursion(pathsList);
}

function sortPush(path,pathsList){
	var i = 0
	//console.log("Pushing...");
	for (i = 0; (i < pathsList.length) && (pathsList[i].average > path.average); i++){
		//console.log(pathsList[0]);
	}
	pathsList.splice(i, 0, path);
	//console.log("EndingSort...");
}

function calcAverage(path){
	path;
}
/*PATH ZERO!!*/
function nextState1(path){
	//path = path1;
	path.stateSet[path.stateSet.length - path.empList.length] = 1;

	if((path.remaining - path.empList[0].salary) < 0)
		return "error"
	emp = path.empList.shift();
	path.remaining -= emp.salary;
	path.productivity += emp.productivity;
	path.average += path.productivity/(money - path.remaining);
	return path;
}
//functional nextState1
var x;
function fNextState1(path1){

	path = JSON.parse(JSON.stringify(path1));
	path.stateSet[path.stateSet.length - path.empList.length] = 1;
	//path = JSON.parse(JSON.stringify(path1));
	//path = path1;
	x = path
	//console.log(path);
	if((path.remaining - path.empList[0].salary) < 0)
		return "error"
	emp = path.empList.shift();
	path.remaining -= emp.salary;
	path.productivity += emp.productivity;
	path.average += path.productivity/(money - path.remaining);
	return path;
}

function nextState0(path){
	emp = path.empList.shift();	
	return path;
}
function fNextState0(path1){
	path = JSON.parse(JSON.stringify(path1));
	emp = path.empList.shift();	
	return path;
}

function myFunction() {
	str = document.getElementById("frm1").name()
	window.alert(str);
}

function node(value) {
	this.value = value;
}

var empList = [];
empList.push(new Employee(1.2,20));
empList.push(new Employee(2.0,30));
empList.push(new Employee(0.8,10));
empList.push(new Employee(1.5,20));

function copyObj(obj) {
	var copy = JSON.parse(JSON.stringify(obj));
	return copy;
}

var orig_pathsList = new Path(empList);
//var pathsList = JSON.parse(JSON.stringify(orig_pathsList));
var path = copyObj(orig_pathsList);
var pathsList = [];
pathsList[0] = path;

path0 = fNextState0(pathsList[0]);
path1 = fNextState1(pathsList[0]);
x = path0;
console.log(recursion(pathsList))