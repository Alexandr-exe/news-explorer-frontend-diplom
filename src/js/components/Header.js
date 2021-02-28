
class Header {
  constructor(nav, buttonLogout, getUser, logout) {
    this.nav = nav;
    this.getUser = getUser;
    this.buttonLogout = buttonLogout;
    this.logout = logout;

    this.buttonAuth = document.querySelector('#auth-button');
    this.secondPage = document.querySelector('#text-on-login');

    this.name = this.buttonLogout.querySelector('#name-user');

    this.rename = this.rename.bind(this)
    this.exit = this.exit.bind(this)
    this.setEventListeners()
  }

  rename() {
    if (localStorage.token) {
      this.getUser()
        .then((data) => {
          this.name.textContent = `${data.name}`;
          this.buttonAuth.classList.add('button_hidden');
          this.buttonLogout.classList.remove('button_hidden');
          this.secondPage.classList.remove('nav_hidden');
          this.nav.style.width = '390px'
          return
        })
    } else {
      this.buttonAuth.classList.remove('button_hidden');
      this.buttonLogout.classList.add('button_hidden');
      this.secondPage.classList.add('nav_hidden');
      this.nav.style.width = '280px'
    }
  }

  reLocation(){

      window.location.href = '/';
  }
  exit() {
    localStorage.removeItem('token');
    this.rename()
    location.reload 
    this.logout()
 
  }

  setEventListeners() {
    this.buttonLogout.addEventListener('click', this.exit)
  }
}
export default Header