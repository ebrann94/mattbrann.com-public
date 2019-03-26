import React, { Component } from 'react';
import ProjectList from './components/ProjectList';
import AddNewProject from './components/AddNewProject';
import AddImage from './components/AddImage';
import ImagePreview from './components/ImagePreview';
import Login from './components/Login';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      projectList: null,
      currentProject: {
        section: '',
        name: '',
        images: []
      },
      loggedIn: !!localStorage.getItem('token'),
      token: localStorage.getItem('token') || ''
    }
  }

  fetchProjectList = () => {
    fetch('/admin/projects', {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({projectList: data});
      });
  }

  handleAddNewProject = (e) => {
    e.preventDefault();

    const section = e.target.section.value.replace(' ', '_').toLowerCase();
    const projectName = e.target.project.value.replace(' ', '_').toLowerCase();

    const projectInfo = {
      section,
      projectName
    }

    fetch('/admin/add-new-project', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer: ${this.state.token}`
      },
      body: JSON.stringify(projectInfo)
    }).then(res => {
      if (res.ok === true) {
        console.log('New Project Added');
      }
      return res.json();
    }).then(data => {
      console.log(data);
      this.setState({projectList: data});
    })

  }

  handleSelectCurrentProject = (section, projectName) => {
    let currentProject = {
      section,
      name: projectName
    };

    this.state.projectList[section].forEach(project => {
      if (project.name === projectName) {
        // currentProject.name = project.name;
        currentProject.images = project.images;
      }
    });

    this.setState({ currentProject });
  }

  handleUploadImage = (e) => {
    e.preventDefault();

    const form = e.target;
    
    const data = new FormData();
    data.append('section', this.state.currentProject.section);
    data.append('projectName', this.state.currentProject.name);
    data.append('photo', form.photo.files[0]);

    for(let pair of data.entries()) {
      console.log(pair);
    }

    fetch('/admin/add-photo', {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    })
    .then(res => {
        if (res.ok) {
          console.log('Image Uploaded');
        }
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target.password.value);
    // this.setState({ loggedIn: true });
    const credentials = {
      password: e.target.password.value
    }

    fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.loginSuccess) {
        localStorage.setItem('token', data.token);
        this.setState({
          loggedIn: true,
          token: data.token
        });
        this.fetchProjectList();
      }
      
    })
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.fetchProjectList();
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="app">
          <div className="project-list">
           <h2>Project List</h2>
            <ProjectList 
              projectList={this.state.projectList}
              handleSelectCurrentProject={this.handleSelectCurrentProject}
            />
            <AddNewProject handleAddNewProject={this.handleAddNewProject} />
          </div>
          <section className="current-project">
            <div className="current-project__info">
              <h4>{this.state.currentProject.section}</h4>
              <h4>{this.state.currentProject.name}</h4>
            </div>
            <ImagePreview {...this.state.currentProject} />
            <AddImage  
              handleUploadImage={this.handleUploadImage}
            />
          </section>
        </div>
        );
      } else {
        return ( 
          <div>
            <Login handleLogin={this.handleLogin} />
          </div>
        );
      }

    }
}

export default App;
