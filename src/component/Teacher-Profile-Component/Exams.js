import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory({
    forceRefresh: true
});
class Exams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
             server: '/',
            ExamPage: "",
            AvailabelExams:[],
            DetailsOfExam:{},
        }
    }
    handlechange =(value)=>{
        console.log(value);
        
        this.setState({
            ExamPage : "ShowStudents",
            DetailsOfExam : value
        })
    }
    GetAllExamsAvailableThatNeedToBeCorrected =(e)=>{
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        let value = e.target.value;
        let data = {
            TeacherId : UserId,
            academic_year:value,

        }
        fetch(this.state.server + "GetAllExamsAvailableThatNeedToBeCorrected", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((result) => { return result.json(); }).then((result) => {
            console.log(result);
            this.setState({
                AvailabelExams : result,

            })
        })
    }
    GotoCorrectionPage = (AnswerId)=>{
        const cookies = new Cookies();
        cookies.set('AnswerId', JSON.stringify(AnswerId));
    }
    Examhandling = () => {
        if (this.state.ExamPage === "") {
            return (
                <div>
                    <h4 className="info-head text-center" ><strong> الامتحانات الوارد تصحيحها</strong></h4>
                    <div style={{ display: "flex" , marginBottom:"70px"}} >
                        <h3><strong> المرحلة الدراسية</strong></h3>
                        <fieldset style={{ width: "250px" }} >
                            <select onChange={(e) => {this.GetAllExamsAvailableThatNeedToBeCorrected(e) }} name="academic_year" className="myList" style={{ color: "black" }}>
                                <option value="none">none</option>
                                <option value="first year">اولى ابتدائى</option>
                                <option value="second year">تانية ابتدائى</option>
                                <option value="third year">تالتة ابتدائى</option>
                                <option value="fourth year">رابعة ابتدائى</option>
                                <option value="fifth year">خامسة ابتدائى</option>
                                <option value="sixth year">ستة ابتدائى</option>
                                <option value="seventh year">اولى اعدادى</option>
                                <option value="eighth year">تانية اعدادى</option>
                                <option value="ninth year">تالتة اعدادى</option>
                                <option value="tenth year">اولى ثانوى</option>
                                <option value="eleventh year">تانية ثانوى</option>
                                <option value="twelfth year">تالتة ثانوى</option>
                            </select>
                        </fieldset>
                    </div>
                    {this.state.AvailabelExams.map((value)=>{
                        return( <h4 style={{width:"500px"  , textAlign:"right" , cursor:"pointer" , marginRight:"10px"}} onClick={()=>{this.handlechange(value)}}><strong>{value.Examname}</strong></h4> )
                    })}
                    
                </div>
            )
        } else if(this.state.ExamPage === "ShowStudents"){
            return(<div>
                <h4 className="info-head text-center" ><strong> الامتحانات الوارد تصحيحها</strong></h4>

                <h4 className="info-head text-center" style={{color:"red"}} ><strong>{this.state.DetailsOfExam.Examname}</strong></h4>

                <h3 style={{width:"500px"  , textAlign:"right" , cursor:"pointer" , marginRight:"10px"}} ><strong> الطلاب الذين ادو الامتحان هم</strong></h3>

                {
                    Object.keys(this.state.DetailsOfExam.TheExamedStudent).map((key ,i )=>{
                        let data =  this.state.DetailsOfExam.TheExamedStudent[key];
                        return(<Link to="CorrectingTheExams" style={{ color: "black" }}><h4 style={{width:"500px"  , textAlign:"right" , cursor:"pointer" , marginRight:"10px" , marginTop:"20px"}} onClick={()=>{this.GotoCorrectionPage(data.AnswerId)}}><strong> {data.StudentName}</strong></h4></Link> )
                    })
                }

            </div>)
        }
    }

    render() {
        return (<div className="info-container  overflowcss " ref={(el) => { this.finding_Teacher = el }} >
            <div className="info teacher-seacrh-container">
                <div className="removes" onClick={this.props.addOrRemove} id="removes">X</div>
                {this.Examhandling()}
            </div>
        </div>
        )
    }
}

export default Exams;