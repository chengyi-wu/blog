import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import axios from 'axios';

class BlogTitleEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue(),
    placeholder : "Title"
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('markdown')
      );
    }
  };

  render () {
    return (
      <RichTextEditor toolbarClassName="title-toolbar"
        placeholder={this.state.placeholder}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

class BlogBodyEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue(),
    placeholder: "What's up?"
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value
      );
    }
  };

  render () {
    return (
      <RichTextEditor className="editor-class" 
        placeholder={this.state.placeholder}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

class BlogForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      id:'',
      title:RichTextEditor.createValueFromString("Abc","markdown"),
      body:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  componentDidMount(){
    //console.log('DidMount');
    var id = document.getElementById('blog-id').innerText;
    //console.log(document.getElementById('blog-id'));
    axios.get('/api/posts/' + id).then(res => {
        console.log(res)
        this.setState({
          id: id,
          title: res.data.title,
          body: RichTextEditor.createValueFromString(res.data.body,"html")
        });
        this.refs.title_editor.state.value = RichTextEditor.createValueFromString(this.state.title,"markdown");
        this.refs.body_editor.state.value = this.state.body;
        this.refs.title_editor.forceUpdate();
        this.refs.body_editor.forceUpdate();
        //document.title = this.state.title;
        //this.render();
    }).catch(err => {
      console.log(err);
    })
  }
  
  handleTitleChange(event) {
    //console.log(event.target.value);
    this.setState({title : event });
  }

  handleBodyChange(event) {
    //console.log(event);
    this.setState({body : event });
  }


  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.title + this.state.body.toString('html'));
    event.preventDefault();
    this.state.title = this.state.title.trim();
    if(this.state.title.length == 0 ||
      this.state.body.toString("markdown").trim().length == 0)
      return;
    
    axios.post('/api/posts/edit/' + this.state.id, {
      'title' : this.state.title,
      'body' : this.state.body.toString('html')
    }).then(res => {
      console.log(res.data);
      window.location = '/posts/' + res.data.id;
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <article>
          {/* <p>
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder={this.state.placeholder} />
          </p> */}
          <BlogTitleEditor ref="title_editor" value={this.state.title} onChange={this.handleTitleChange} />
          <p />
          <BlogBodyEditor ref="body_editor" value={this.state.body} onChange={this.handleBodyChange} />
          <p>
            <input className="submit-button" type="submit" value="Submit" />
          </p>
        </article>
      </form>
    )
  }
}

ReactDOM.render(
    <BlogForm />,
    document.getElementById('blog-form')
);





