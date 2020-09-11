import React, { Component } from 'react';

import QuestionTypes from './add-exams-component/question-types'
class adding_Full_question extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            server: '/',
            i: 4,
            question_names: ['أ', "ب", "ج", "د"],
            question_var:['Q1','Q2','Q3','Q4',]
        }
    }


    AddandRemove = (e) => {

        if (e.target.id === "add") {
            if (this.state.i <= 3) {
                this.setState({
                    i: this.state.i + 1
                });
            } else {

            }
        } else if (e.target.id === "remove") {
            if (this.state.i > 1) {
                this.setState({
                    i: this.state.i - 1
                });
            } else {

            }
        }
    }

    render() {
        return (
            <div className="adding_Full_question" style={{width:"600px"}}>
                    <h1 class="head " style ={{textAlign:"right"}}><b>السؤال {this.props.question_name}:-</b></h1>
                <ul >{[...Array(this.state.i)].map((e, i) => {
                    return (
                        <QuestionTypes question_name={this.state.question_names[i]} MainQ={this.props.question_var} Q={this.state.question_var[i]} />
                    )

                })}</ul>
                
            </div>
        );
    }
}

export default adding_Full_question;