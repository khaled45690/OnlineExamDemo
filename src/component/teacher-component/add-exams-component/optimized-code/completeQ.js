import React, { Component } from 'react';

import { SharedData } from '../../../../SharedData/Shareddata'
class adding_exams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            x: 1,
            g: 0,
            image: []
        }
    }

    AddandRemove = (e) => {
        e.preventDefault();
        if (e.target.id === "Form1Addchoice") {
            if (this.state.x < 4) {
                this.setState({
                    x: this.state.x + 1
                });
            }
        } else if (e.target.id === "Form1Removechoice") {
            if (this.state.x >= 2) {
                this.setState({
                    x: this.state.x - 1
                });
            }
        }
    }

    upload = (e) => {
        let file = e.target.files;

        this.setState({
            image: []
        });
        console.log(e.target.result);

        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(file[i]);
                reader.onload = (e) => {
                    let data = { file: e.target.result }
                    this.state.image.push(e.target.result)
                    console.log(this.state.image);
                    this.setState({ g: i + 1 })

                }
            }
            // reader.readAsDataURL(file[0]);
            // reader.onload = (e)=>{
            //     let data ={file : e.target.result}
            //     this.state.image.push(e.target.result)

            // }
        }

    }

    render() {
        return (
            <SharedData.Consumer>{(context) => {
                let { ExamQ , filtersub} = context;
                return (
            <div className="adding_exams">
                <div className="input-flex">
                    <div class="input-flexs">
                        {[...Array(this.state.x)].map((e, i) => {
                            return (
                                <div class="">
                                    <input style={{ width: "50px" }} type="text" class="form-control complete-input " onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Answer" var5="سؤال اكمل العبارات التاليه" var6={"sub" + (i+1)} var7="QType" placeholder="ادخل الاجابة الصحيح" />
                                    <fieldset style={{ width: "250px" }}>
                                        <label ><h4>اختر الدرجة-></h4></label>
                                        <select onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="degree" var5="سؤال اكمل العبارات التاليه" var6={"sub"+ (i+1)} var7="QType" className="myList">
                                            <option value="0">0</option>
                                            <option value="0.5">0.5</option>
                                            <option value="1">1</option>
                                            <option value="1.5">1.5</option>
                                            <option value="2">2</option>
                                            <option value="2.5">2.5</option>
                                            <option value="3">3</option>

                                        </select>
                                    </fieldset>
                                </div>);
                        })}
                    </div>
                </div>
                <div class="form-group" >
                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "60", marginLeft: "20px" }}  id="Form1Addchoice" value="اضافة السؤال" class="btn btn-success">+ اضافة اجابة</button>
                    <button type="" onClick={(e)=>{ this.AddandRemove(e); filtersub(e); }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4={"sub"+this.state.x}  style={{ borderRadius: "60", marginLeft: "20px" }}  id="Form1Removechoice" value="حذف السؤال" class="btn btn-success">- حذف اجابة</button>
                </div>

            </div>
              );
            }}</SharedData.Consumer>
        );
    }
}

export default adding_exams;