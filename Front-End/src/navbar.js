showNav()
function showNav() {
    let token = localStorage.getItem('token');
    if(token){
        $('#nav').html(`
    <button onclick="showFormAdd()">Them moi</button>
    <button onclick="showHome()">Trang chu</button>
    <button onclick="logOut()">logout</button>
    <input type="text">
    <button type="submit">Search</button>`)
    } else {
        $('#nav').html(`
    <button onclick="showFormLogin()">Login</button>
    <button onclick="showFormSignup()">Register</button>
    `)
    }
}