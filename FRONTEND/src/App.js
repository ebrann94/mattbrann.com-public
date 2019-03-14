import React, { Component } from 'react';
import ProjectList from './components/ProjectList';
import AddNewProject from './components/AddNewProject';
import AddImage from './components/AddImage';
import ImagePreview from './components/ImagePreview';

import ProjectsJSON from './projects.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      projectList: {

      },
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
    // fetch('/admin/projects')
    //   .then(res => {
    //     console.log(res.json());
    //   })
    //   .then(data => {
    //     // console.log(data);
    //     // this.setState({projectList: data.projects});
    //   })
    this.setState({projectList: ProjectsJSON})
  }

  handleAddNewProject = (e) => {
    e.preventDefault();

    const section = e.target.section.value;
    const projectName = e.target.project.value

    const projectInfo = {
      section,
      projectName
    }

    console.log(projectInfo);

    this.setState((prevState ) => {
      prevState.projectList[section].push({
        name: projectName,
        show: true,
        images: []
      });
      return {
        projectList: prevState.projectList
      }
    })

    // fetch('/admin/add-new-project', {
    //   method: 'POST',
    //   headers: {

    //   },
    //   body: JSON.stringify(projectInfo)
    // });

  }

  handleSelectCurrentProject = (section, projectName) => {
    let newProject = {
      section
    };

    this.state.projectList[section].forEach(project => {
      if (project.name === projectName) {
        newProject.name = project.name;
        newProject.images = project.images;
      }
    });

    this.setState({currentProject: newProject});
  }

  handleUploadImage = (e) => {
    const data = new FormData(e.target.value);

    data.append('details', JSON.stringify(this.state.currentProject))

  }

  componentDidMount() {
    this.fetchProjectList();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <h1>App is Rendering</h1>
        <ProjectList 
          projectList={this.state.projectList}
          handleSelectCurrentProject={this.handleSelectCurrentProject}
        />
        <AddNewProject handleAddNewProject={this.handleAddNewProject} />
        <section className="image">
          <ImagePreview {...this.state.currentProject} />
          <AddImage handleUploadImage={this.handleUploadImage}/>
        </section>
      </div>
    );
  }
}

export default App;
