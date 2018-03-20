import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class DeleteButton extends React.Component{
    constructor(props) {
        super(props);

        this.state = { };
    }

    componentDidMount(){
        var id = document.getElementById('blog-id').innerText;
        this.setState({location: "/posts/edit?id=" + id})
    }

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
            <div>
                <a href={this.state.location} >edit</a> | <a href="#" onClick={this.handleClick} >delete</a>
            </div>
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
            var e = document.getElementById('authenticated-div')
            if(e)
            {
                ReactDOM.render(
                    <DeleteButton />,
                    e
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
                <div className="main-blogblog" dangerouslySetInnerHTML={ {__html: this.state.body}} />
                <div className="info">
                    {this.state.date}
                </div>
            </article>
        );
    }
}

ReactDOM.render(
    <BlogForm />,
    document.getElementById('BlogPost')
);