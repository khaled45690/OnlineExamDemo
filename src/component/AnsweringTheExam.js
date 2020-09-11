import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import HandelTheAnswer from './AnsweringExamComponent/HandelTheAnswer'
import { SharedData } from '../SharedData/Shareddata'
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory({
  forceRefresh: true
});
class AnsweringTheExam extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
             server: '/',
            ExamInfo: {
                Exam: {}
            },
            check: false,
            err: {},
        }

    }
    button = (Exam) => {

        return (<button className="ExamChecking" onClick={() => { this.CheckForAnswerMissing(Exam) }}>تسجيل الامتحان</button>)
    }

    componentDidMount() {
        const cookies = new Cookies();
        let ExamId = cookies.get('ExamId');
        fetch(this.state.server + "GetExam", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ExamId)
        }).then((result) => { return result.json(); }).then((result) => {
            console.log(result);
            this.setState({
                ExamInfo: result,
                check: true,
            })
        })
    }

    CheckForAnswerMissing = (Exam) => {
        let data = Promise.all(
            Object.keys(Exam).map((key1, p1) => {
                if (key1 === "name") {

                } else {
                    let Var1 = Exam[key1]
                    return (new Promise((resolve) => {
                        resolve(Object.keys(Exam[key1]).map((key2, p2) => {
                            let Var2 = Var1[key2];
                            return new Promise((resolve) => {
                                Object.keys(Var2).map((key3, p3) => {
                                    if (key3 === "CorrectionType" || key3 === "QType") {

                                    } else {
                                        let Var3 = Var2[key3]
                                        resolve(Object.keys(Var3).map((key4, p4) => {
                                            return (new Promise((resolve) => {
                                                let Var4 = Var3[key4]
                                                console.log(key4);
                                                console.log(Var3["StudentAnswer"]);

                                                if (Var3["StudentAnswer"]) {
                                                    resolve("done");
                                                    this.setState((prevstate) => ({
                                                        err: { ...prevstate.err, [key3]: "clear" }
                                                    }))
                                                    console.log();

                                                } else {
                                                    resolve([key1, key2, key3]);
                                                    this.setState((prevstate) => ({
                                                        err: { ...prevstate.err, [key3]: "something missing" }
                                                    }))
                                                }
                                            })
                                            )
                                        }))
                                    }

                                })
                            })
                        }))
                    }
                    ))
                }

            })
        )


        data.then((data) => {
            console.log(data);
            console.log(this.state.err);
            let x = Object.keys(this.state.err).map((key, p) => {
                if (this.state.err[key] === "clear") {
                    return true
                } else {
                    return false
                }
            })
            if (x.every(o => o === true)) {
                const cookies = new Cookies();
                let UserId = cookies.get('UserId');
                let UserName = cookies.get('UserName');
                let data = {
                    ExamId : this.state.ExamInfo._id,
                    SubjectName:this.state.ExamInfo.SubjectName,
                    academic_year:this.state.ExamInfo.academic_year,
                    Examname:this.state.ExamInfo.Examname,
                    Exam: Exam ,
                    StudentId : UserId,
                    TeacherId : this.state.ExamInfo.TeacherId,
                    StudentName : UserName

                }


                
                console.log(data);
               
                    history.push('/Student-Profile');
                  
                fetch(this.state.server + "SaveAnswer", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then((result) => { return result.json(); }).then((result) => {
                    console.log(result);
                })
            }


        })

    }

    Check = () => {
        console.log("Check has been turned to false");

        this.setState({
            check: false
        })
    }

    render() {
        return (
            <SharedData.Consumer>{(context) => {
                let { Exam } = context
                return (
                    <div className="AnsweringTheExam">
                        <section className="color-white" >
                            <div class="container">
                                <div class="row ask" >
                                    <div class="board" style={{ marginTop: "10px", marginBottom: "5px" }}>
                                        <div ref={(el) => { this.ShowingExam = el }}  >
                                            <HandelTheAnswer ExamInfo={this.state.ExamInfo} check={this.state.check} CheckFunc={this.Check} />
                                            <div style={{ height: "50px" }}>
                                                {this.button(Exam)}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            }}</SharedData.Consumer>
        );
    }
}

export default AnsweringTheExam;