const name = 'Max';
let age = 29;
const hasHobbies = true;

age = 30;

console.log(name);

function summarizeUser(userName, userAge, userHasHobby){
    return{
        display = 'Name is ' +  userName +
        ', age is ' + 
        userAge + 
        ' and user has hobbies: ' +
        userHasHobby
    };
}

console.log(summarizeUser(name, age, hasHobbies));