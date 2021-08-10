// Your code here
function createEmployeeRecord(employeeInfo) {
    return{
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []      
    };
}

function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => {
        return createEmployeeRecord(record)
    });
}

function createTimeInEvent(empRecord, dateStamp) {
    const dateData = dateStamp.split(' ');
    empRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateData[1], 10),
        date: dateData[0]
    });
    return empRecord;
}

function createTimeOutEvent(empRecord, dateStamp) {
    const dateData = dateStamp.split(' ');
    empRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateData[1], 10),
        date: dateData[0]
    });
    return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
    const timeIn = empRecord.timeInEvents.find( event => {
        return event.date === date}).hour;
    
    const timeOut = empRecord.timeOutEvents.find( event => {
        return event.date === date}).hour;

    return (timeOut - timeIn) / 100; 
}

function wagesEarnedOnDate(empRecord, date) {
    const payRate = empRecord.payPerHour; 
    const hoursWorked = hoursWorkedOnDate(empRecord, date); 

    return payRate * hoursWorked;
}

function allWagesFor(empRecord) {
    const sumWages = (totalWage, wage) => {
        return totalWage += wage
    }; 

    //get dates 
    const datesWorked = empRecord.timeInEvents.map( event =>{
        return event.date
    });

    //get wages 
    const allWages = datesWorked.map( date =>{
        return wagesEarnedOnDate(empRecord, date)
    });

    return allWages.reduce(sumWages, 0);
}

function calculatePayroll(empRecords) {
    const sumAllWages = (totalWages, wage) => {
        return totalWages += wage
    };  

    const totalWages = empRecords.map( record =>{
        return allWagesFor(record)
    });

    return totalWages.reduce(sumAllWages, 0);
}

function findEmployeeByFirstName(empRecords, firstName) {
    const foundRecord = empRecords.find( record => {
        if(record.firstName === firstName){
            return record;
        }
        else{ return undefined}
    }); 
    return foundRecord;
}