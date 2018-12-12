import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Star extends Component {

    state = {
        rating: 0,
        answer: {"web":0,"android":0,"ios":0,"blockchain":0,"competitive":0}
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        let answer= this.state.answer;
        answer[name]=nextValue;
        answer = JSON.stringify(answer);
        let object = {"link": "","mcq_answer": 0, 
        "answer": answer, "question_id": this.props.qid};
        this.props.onUpdateToSend(this.props.qid, object);
        // console.log(nextValue);
    }

    componentDidMount() {
        if(this.props.answer!=="") {
            this.setState({answer: JSON.parse(this.props.answer)});
        }
    }

    render() {
        // console.log(this.props.answer);
        // const { rating } = this.state;
        return(
            <div className="subjective">
                <div className="flex-wrap center-vert">
                    <p className="marg-zero mright-half">Q)</p>
                    <p className="marg-zero" dangerouslySetInnerHTML={{ __html: this.props.qTitle }} />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">Web</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="web" 
                    starCount={5}
                    value={this.state.answer['web']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">Android</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="android" 
                    starCount={5}
                    value={this.state.answer['android']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">IOS</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="ios" 
                    starCount={5}
                    value={this.state.answer['ios']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">Blockchain</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="blockchain" 
                    starCount={5}
                    value={this.state.answer['blockchain']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">Competitive</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="competitive" 
                    starCount={5}
                    value={this.state.answer['competitive']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">Machine Learning</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="machineLearning" 
                    starCount={5}
                    value={this.state.answer['machineLearning']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div className="center-vert">
                    <p className="mright-half marg-zero center-vert">Artificial Intelligence</p>
                    <StarRatingComponent 
                    className="star-component"
                    name="artificialIntelligence" 
                    starCount={5}
                    value={this.state.answer['artificialIntelligence']}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default Star;