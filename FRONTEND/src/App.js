import React, { Component } from 'react';
import ProjectList from './components/ProjectList';
import AddNewProject from './components/AddNewProject';
import AddImage from './components/AddImage';
import ImagePreview from './components/ImagePreview';

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
      loggedIn: false,
      token: ''
    }
  }

  fetchProjectList = () => {
    fetch('/admin/projects')
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
        'Content-type': 'application/json'
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
      body: data
    })
    .then(res => {
        if (res.ok) {
          console.log('Image Uploaded');
        }
    })
  }

  handleTestServer = () => {
    fetch('/admin/test-connection');
  }

  componentDidMount() {
    this.fetchProjectList();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
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
        {/* <button onClick={this.handleTestServer}>Test Server Connection</button> */}
      </div>
    );
  }
}

export default App;
