import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = { };
    }

    componentDidMount(){
        //console.log('DidMount');
        var id = document.getElementById('blog-id');
        //console.log(document.getElementById('blog-id'));
        axios.get('/api/posts/' + id.innerText).then(res => {
            console.log(res)
            this.setState(res.data);
            document.title = this.state.title;
        }).catch(err => {
            //console.log(err)
            document.title = err
            this.setState({title:"Something went wrong", body:err})
            //this.setState(err.data);
        })
        //document.title = this.state.title;
    }

    render() {
        return (
            <article>
                <h3>{this.state.title}</h3>
                <p dangerouslySetInnerHTML={ {__html: this.state.body}} />
                <p>{this.state.date}</p>
            </article>
        );
    }
}

ReactDOM.render(
    <Form />,
    document.getElementById('BlogPost')
);