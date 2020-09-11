import React, { Component } from 'react';
import { SharedData } from '../../../../SharedData/Shareddata'
class adding_exams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            x: 1,
            g: 0,
            image: [],
            TOrF: false,
            QName: "انت نسيت تحط اسم للسؤال فا حط اسم و ضيف او احذف اى حرف فى السؤال عشان يتم التغيير فالصفحة"
        }
    }

    handy = (e) => {
        if (e.target.value === '0') {
            this.QText.style.display = "block"
            this.Qimage.style.display = "none"
        } else {
            this.QText.style.display = "none"
            this.Qimage.style.display = "block"
        }
    }

    handy1 = (e) => {
        if (e.target.value === '0') {
            this.AText.style.display = "block"
            this.Aimage.style.display = "none"
        } else {
            this.AText.style.display = "none"
            this.Aimage.style.display = "block"
        }

    }
    
    upload = (e) => {

        let file = e.target.files;

        this.setState({
            image: [],
            TOrF: true
        });

        console.log(this.state.g);
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(file[i]);
                reader.onload = (e) => {
                    this.state.image.push(e.target.result)

                    this.setState({ g: i + 1 })
                    console.log(this.state.g);

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
                let { ExamQ, Examimage } = context;
                return (

                    <div className="adding_exams">
                        <div class="">
                            {/* <fieldset style={{ width: "450px" }} >
                                <label ><h3>{this.props.i + 1 + "- اختر طريقة اضافة السؤال->"}</h3></label>
                                <select onChange={(e) => { this.handy(e) }} className="myList1">
                                    <option value="0">نص</option>
                                    <option value="1">صورة</option>

                                </select>
                            </fieldset> */}
                           
                            <div class="input-group question-input">

                                <div class="input-group question-input " style={{ marginBottom: "10px" }} ref={(el) => { this.QText = el }}>
                                    <input type="text" class="form-control question-input " onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Question" var5={this.props.QName} var7="QType" placeholder="ادخل السؤال " />

                                </div>
                                <div class="input-group question-input " style={{ marginBottom: "10px", display: "none" }} ref={(el) => { this.Qimage = el }}>
                                    <div style={{ display: "flex" }}>
                                        <h4 style={{ width: "400px", marginTop: "20px" }} class=""  >اضف صورة للسؤال بدل السؤال النصى:-></h4>
                                        <div class="box">
                                            <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Question" var5={this.props.QName} type="file" var7="QType" id={"Question" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                            <label for={"Question" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                        </div>

                                    </div>
                                </div>
                                {/* <fieldset style={{ width: "450px" }} >
                                    <label ><h4>اختر طريقة اضافة السؤال-></h4></label>
                                    <select onChange={(e) => { this.handy1(e) }} className="myList1">
                                        <option value="0">نص</option>
                                        <option value="1">صورة</option>

                                    </select>
                                </fieldset> */}
                                <textarea rows="auto" class="form-control question-input " ref={(el) => { this.AText = el }} onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Answer" var5={this.props.QName} var7="QType" style={{ marginBottom: "10px" }} disabled={this.state.TOrF} cols="50" placeholder="ادخل الاجابة " />
                                <div class="input-group question-input " style={{ marginBottom: "10px", display: "none" }} ref={(el) => { this.Aimage = el }}>
                                    <div style={{ display: "flex" }}>
                                        <h4 style={{ width: "400px", marginTop: "20px" }} class=""  >اضف صورة للاجابة بدل الاجابة النصى:-></h4>
                                        <div class="box">
                                            <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Answer" var5={this.props.QName} type="file" var7="QType" id={"Answer" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                            <label for={"Answer" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                        </div>

                                    </div>
                                </div>

                                <fieldset style={{ width: "250px" }} >
                                    <label ><h4>اختر الدرجة-></h4></label>
                                    <select onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="degree" var5={this.props.QName} var7="QType" className="myList">
                                        <option value="0">0</option>
                                        <option value="0.5">0.5</option>
                                        <option value="1">1</option>
                                        <option value="1.5">1.5</option>
                                        <option value="2">2</option>
                                        <option value="2.5">2.5</option>
                                        <option value="3">3</option>
                                    </select>
                                </fieldset>
                            </div>
                        </div>
                     
                    </div>
                );
            }}</SharedData.Consumer>
        );
    }
}

export default adding_exams;