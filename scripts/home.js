const LoggedInUser = 'loggedInUser'
const USERS = 'user';



console.log(USERS)

const checkAuth = () => {
    const loggedInUser = localStorage.getItem(LoggedInUser);
    const parsedLoggedInUser = JSON.parse(loggedInUser);
    const { username } = parsedLoggedInUser || {};
    const users = JSON.parse(localStorage.getItem(USERS)) || [];


    if (users.find((user) => username === user.username)) {
        const welcomeText = document.getElementById('userGreet');
        welcomeText.innerHTML = username;
    } else {
        location.replace("/Users/hasif/Desktop/Haris Intern task/Authentication/pages/login/login.html")
    }


};
checkAuth();



const logout = () => {
    localStorage.removeItem(LoggedInUser);
    window.location.href = "/Users/hasif/Desktop/Haris Intern task/Authentication/pages/login/login.html"

}
