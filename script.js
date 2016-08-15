var money = 70;
var problem = 120;

function Employee (productivity,salary) {
	this.productivity = productivity;
	this.salary = salary;
	//this.contracted = false;
	//this.next = null;
}
function Path(empList) {
	this.productivity = 0;
	this.remaining = money;
	this.average = 0;
	this.empList = empList;
	this.stateSet = new Array(empList.length+1).join('0').split('').map(parseFloat);
}
function copyObj(obj) {
	var copy = JSON.parse(JSON.stringify(obj));
	return copy;
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
		console.log(pathsList[0].productivity);
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
var empList = []
var count = 1;


function submitConstruct(empList) {
	 function interna() {
        str = document.getElementById("first").value
		prod = parseInt(str);
		document.getElementById("first").value = "0";

		str2 = document.getElementById("second").value
		document.getElementById("second").value = "0";
		salary = parseInt(str2)

		empList.push(new Employee(prod,salary));

		document.getElementById("employees").innerHTML += '<p>Employee: ' + count++ + '</p>' + '<p>Productivity: ' + prod + '</p>' + '<p>Salary: ' + salary + '</p><p></p>'
     }
     return interna;
}

var myFunction = submitConstruct(empList);

function myFunction2() {
	str = document.getElementById("first").value
	prod = parseFloat(str);
	document.getElementById("first").value = "0";

	str2 = document.getElementById("second").value
	document.getElementById("second").value = "0";
	salary = parseFloat(str2)

	empList.push(new Employee(prod,salary));

	document.getElementById("employees").innerHTML += '<p>Productivity: ' + prod + '</p>' + '<p>Salary: ' + salary + '</p><p></p>'
	//window.alert(parseInt(str) + parseInt(str2));
}

function execTest1() {
	money = 70;
	problem = 120; 
	empList.push(new Employee(20,20));	
	empList.push(new Employee(50,32));	
	empList.push(new Employee(20,20));	
	empList.push(new Employee(200,80));	
	empList.push(new Employee(50,15));	
	empList.push(new Employee(10,10));	
	empList.push(new Employee(30,30));	
	runFunction();
}
function execTest2() {
	money = 40;
	problem = 25; 
	empList.push(new Employee(12,20));
	empList.push(new Employee(20,30));
	empList.push(new Employee(8,10));
	empList.push(new Employee(15,20));
	runFunction();
}

function runConstructor(){
	function interna() {
		var orig_pathsList = new Path(empList);
		console.log(JSON.stringify(orig_pathsList));
		//var pathsList = JSON.parse(JSON.stringify(orig_pathsList));
		var path = copyObj(orig_pathsList);
		var pathsList = [];
		pathsList[0] = path;
		//console.log(recursion(pathsList))
		states = recursion(pathsList);
		console.log(states);

		var printar = "<p>Programers: ";
		function printEmployee(item,index){
			if(item == true){
				if(index != (states.length-1))
					printar += (index+1) + ", ";
				else printar += "and " + (index+1) + " ";
			}
		}
		states.forEach(printEmployee);
		printar += "were hired</p>"
		document.getElementById("employees").innerHTML = printar;
		//document.getElementById("employees").innerHTML = JSON.stringify(recursion(pathsList));

		// Reset stuffs
		empList = [];
		count = 1;
	}
	return interna;
}

var runFunction = runConstructor();
function node(value) {
	this.value = value;
}
