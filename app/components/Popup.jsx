import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);      
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
            this.props.handleClick();      
           false && location.reload();// restart the application
    }
    
    componentWillReceiveProps(nextProps) {
      //this.setState()  
    }
    
    createMarkup(text) {
        return {__html: text};
    }
    
    
    render() {
       
        let { title, text, buttonText } = this.props;
        
        let { style } = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
