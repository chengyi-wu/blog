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
      <RichTextEditor toolbarClassName="title-toolbar" placeholder={this.state.placeholder}
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
    value: RichTextEditor.createEmptyValue()
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
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

class BlogForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { title:'', body:''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
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
    axios.post('/api/posts/add', {
      'title' : this.state.title,
      'body' : this.state.body.toString('html')
    }).then(res => {
      console.log(res.data);
      window.location = '/posts/' + res.data;
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <article>
          {/* <p>
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder={this.state.placeholder} />
          </p> */}
          <BlogTitleEditor value={this.state.title} onChange={this.handleTitleChange} />
          <p />
          <BlogBodyEditor value={this.state.body} onChange={this.handleBodyChange} />
          <p>
            <input type="submit" value="Submit" />
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





