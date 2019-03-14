import React from 'react';

const AddImage = (props) => {
    return (
        <div>
            <h3>Add a New Image</h3>
            <form onSubmit={props.handleUploadImage} encType="multipart/form-data">
                <input type="file" id="image-input" name="photo" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddImage;