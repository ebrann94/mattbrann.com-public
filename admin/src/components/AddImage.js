import React from 'react';

class AddImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
        this.fileInput = React.createRef();
    }

    handleChange = () => {
        const file = this.fileInput.current.files[0];
        if (!file.type.includes('image')) {
            this.setState({ error: 'Please choose an image file' });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const file = this.fileInput.current.files[0];
        if (file) {
            this.props.handleUploadImage(file);
        } else {
            this.setState({ error: 'Please select an image before submitting' });
        }
    }

    render() {
        const { error } = this.state;
        return (
            <div>
                <h3>Add a New Image</h3>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <input 
                        type="file" 
                        id="image-input" 
                        name="photo" 
                        onChange={this.handleChange} 
                        ref={this.fileInput} 
                    />
                    <input type="submit" />
                </form>
                {error && <p>{error}</p>}
            </div>
        )
    }
}

export default AddImage;