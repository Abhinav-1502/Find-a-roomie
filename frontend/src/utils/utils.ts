const checkLoggedUser = () => {
  if(localStorage.getItem("loggedUser")){
    return localStorage.getItem("loggedUser");
  }
}
  
export default checkLoggedUser;