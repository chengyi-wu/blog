import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class DeleteButton extends React.Component{
    handleClick(e){
        e.preventDefault();
        var id = document.getElementById('blog-id').innerText;
        if(window.confirm('Are you sure you want to delete this post?')){
            axios.delete('/api/posts/delete/' + id).then(res => {
                console.log(res)
                window.location = '/';
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        return (
            <a href="#" onClick={this.handleClick} >delete</a>
        );
    }
}

class BlogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { };
    }

    componentDidMount(){
        //console.log('DidMount');
        var id = document.getElementById('blog-id').innerText;
        //console.log(document.getElementById('blog-id'));
        axios.get('/api/posts/' + id).then(res => {
            console.log(res)
            this.setState(res.data);
            document.title = this.state.title;
            if(document.getElementById('delete-div'))
            {
                ReactDOM.render(
                    <DeleteButton />,
                    document.getElementById('delete-div')
                );
            }
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
                <p>
                    {this.state.date}
                </p>
            </article>
        );
    }
}

ReactDOM.render(
    <BlogForm />,
    document.getElementById('BlogPost')
);