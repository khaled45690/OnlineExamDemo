import React from 'react';
import logo from './logo.svg';
import './App.css';
import './CSS/1000-1184.css';
import './CSS/850-1000.css';
import './CSS/650-850.css';
import './CSS/450-650.css';
import './CSS/350-450.css';
import './style.css';
import './css/color.css';
import './css/bootstrap.min.css';
import './css/animate.css';
import './css/animated-headlines.css';
import Header from './component/Header';
import Main from './component/Main'
import Footer from './component/Footer'
import Teacher_Profile from './component/Teacher-Profile'
import Student_Profile from './component/Student-Profile'
import signout_student from './component/signout-student'
import signout_teacher from './component/signout-teacher'
import signin_student from './component/signin-student'
import signin_teacher from './component/signin-teacher'
import adding_exams from './component/teacher-component/add-exams'
import SharedDataProvider from './SharedData/Shareddata'
import MainDataProvider from './SharedData/Maindata'
import AnsweringTheExam from './component/AnsweringTheExam'
import CorrectingtheExam from './component/Teacher-Profile-Component/CorrectingtheExam'
import Tagraba from './tagraba'
import "react-equation"
import "@material-ui/core"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
function App() {
  console.log(window.location.href); 
  return (
    <div className="App">
        <MainDataProvider>
        <SharedDataProvider>
       <BrowserRouter>
        <Header />
        <Route exact path='/' component={Main}   />
        <Route exact path='/Teacher-Profile' component={Teacher_Profile} />
        <Route exact path='/Student-Profile' component={Student_Profile} />
        <Route exact path='/signout-student' component={signout_student} />
        <Route exact path='/signout-teacher' component={signout_teacher} />
        <Route exact path='/adding-exams'    component={adding_exams}    />
        <Route exact path='/signin-student'  component={signin_student}  />
        <Route exact path='/signin-teacher'  component={signin_teacher}  />
        <Route exact path='/AnsweringTheExam' component={AnsweringTheExam}  />
        <Route exact path='/CorrectingtheExams' component={CorrectingtheExam}  />
        <Footer />
        </BrowserRouter>
        </SharedDataProvider>
        </MainDataProvider>
    </div>
  );
}

export default App;
