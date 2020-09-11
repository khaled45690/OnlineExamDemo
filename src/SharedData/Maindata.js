
import React, { Component, createContext } from 'react';
import { createBrowserHistory } from 'history'
import Cookies from 'universal-cookie';
export const MainData = createContext();
let name = 'form-inline txt form-control bg-dark text-white control Search_text2'
export const history = createBrowserHistory({
  forceRefresh: true
});
class MainDataProvider extends Component {
//http://localhost:3001/
  state = {
      server: '/',
    user: [],
    msg: "",
    error: "",
  }

  Signin = (e) => {

    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
      error: "",
      msg: "",
    })
  }

  Submit = (e) => {
    // this function is to check if there is something missing
    e.preventDefault();

    if (typeof this.state.user.email === "undefined" || typeof this.state.user.password === "undefined") {
      this.setState({
        error: "من فضلك تاكد من ادخال البيانات "
      })
    } else {
      // here is the code that will send data to server
      // console.log(this.state.user);
       // console.log(this.state.user); // console.log(this.state.user);
      fetch(this.state.server + "Asignin", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user)
      }).then((result) => { return result.json(); }).then((result) => {
        // console.log(result);

        if (result.result) {

          const cookies = new Cookies();
          cookies.set('UserId', JSON.stringify(result.result["_id"]));
          cookies.set('UserName', JSON.stringify(result.result["name"]));
          cookies.set('AccountType', JSON.stringify(result.result["AccountType"]));
          console.log(cookies.get('UserId'));
          console.log(cookies.get('UserName'));
          console.log(cookies.get('AccountType'));
          if(result.result["academic_year"]){
            cookies.set('Academic_year', JSON.stringify(result.result["academic_year"]));
            console.log(cookies.get('Academic_year'));
          }
          if(cookies.get('AccountType') === "Teacher"){
            history.push('/Teacher-Profile');
          }else{
            history.push('/Student-Profile');
          }
          

          // window.open(e.target.src , "_blank");

          this.setState({ msg: result.msg });
        } else {
          this.setState({ error: result.msg })
        }
      })
    }
  }


  render() {
    return (
      <MainData.Provider value={{
        ...this.state, Signin: this.Signin, Submit: this.Submit
      }}>
        {this.props.children}
      </MainData.Provider>
    );




  }
}

export default MainDataProvider;