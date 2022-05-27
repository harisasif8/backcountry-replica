const USERS = 'user';
const LoggedInUser = 'loggedInUser'

const getUsersFromLocalStorage = () => {
    const usersFromLS = localStorage.getItem(USERS);
    return JSON.parse(usersFromLS);
};

const checkAuth = () => {
    const loggedInUser = localStorage.getItem(LoggedInUser);
    const parsedLoggedInUser = JSON.parse(loggedInUser);
    const { username } = parsedLoggedInUser || {};
    const { password } = parsedLoggedInUser || {};
    const users = JSON.parse(localStorage.getItem(USERS)) || [];

    if (users.find((user) => username === user.username && password === user.password)) {
        window.location.href = "/Users/hasif/Desktop/Haris Intern task/Authentication/pages/dashboard/home.html"; 
    }
};

checkAuth();



const getUserData = (fieldName) => {
    return document.getElementById(fieldName).value
}


const usersFromLS = getUsersFromLocalStorage();
const users = usersFromLS ? usersFromLS : [];


function signup(e) {
    e.preventDefault();
    const firstName = getUserData('fname');
    const lastName = getUserData('lname');
    const username = getUserData('username');
    const password = getUserData('pw');
    const isUserExist = users.find((user) => user.username === username);
    const repeatedUser = getUserData('checkUsername');

    if (isUserExist) {
        // show error user already exist
        repeatedUser.innerHTML = "This username already exists."
    } else {
        const newUser = {
            username,
            password,
            firstName,
            lastName
        };

        users.push(newUser)

        const userJson = JSON.stringify(users);
        localStorage.setItem(USERS, userJson)

        repeatedUser.innerHTML = ''
    }
}

function login(e) {
    e.preventDefault();
    const loginUserName = getUserData('loginUsername');
    const loginPassword = getUserData('loginpw');
    const checkLoginUsername = document.getElementById('checkLoginUsername')
    const isUserExist = users.find((user) => user.username === loginUserName && loginPassword === user.password);

    if (isUserExist) {

        location.replace('/Users/hasif/Desktop/Haris Intern task/Authentication/pages/dashboard/home.html')
        const isUserExistJson = JSON.stringify(isUserExist)
        localStorage.setItem(LoggedInUser, isUserExistJson)

    }
    else {
        checkLoginUsername.innerHTML = "Wrong Username or Password"
    }
}




