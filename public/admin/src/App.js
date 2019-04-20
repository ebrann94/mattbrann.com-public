import React, { Component } from 'react';
import ProjectList from './components/ProjectList';
import AddNewProject from './components/AddNewProject';
import AddImage from './components/AddImage';
import ImagePreview from './components/ImagePreview';
import Login from './components/Login';
import CurrentProjectInfo from './components/CurrentProjectInfo';

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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          this.setState({ apiError: 'Unable to fetch project information'});
        }
      })
      .then(data => {
        console.log(data);
        this.setState({projectList: data});
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleAddNewProject = (fields) => {
    const section = fields.section.replace(' ', '_').toLowerCase();
    const projectName = fields.project.replace(' ', '_').toLowerCase();

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

  handleUploadImage = (file) => {

    const data = new FormData();
    data.append('section', this.state.currentProject.section);
    data.append('projectName', this.state.currentProject.name);
    data.append('photo', file);

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

  handleLogin = (password) => {
    const credentials = {
      password
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
    // console.log(this.state);
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="app">
          <section className="project-list">
            <ProjectList 
              projectList={this.state.projectList}
              handleSelectCurrentProject={this.handleSelectCurrentProject}
            />
            <AddNewProject handleAddNewProject={this.handleAddNewProject} />
          </section>
          <section className="current-project">
            <CurrentProjectInfo currentProject={this.state.currentProject} />
            <ImagePreview {...this.state.currentProject} />
            <AddImage handleUploadImage={this.handleUploadImage} />
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
