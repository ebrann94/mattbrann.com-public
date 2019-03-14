import React from 'react';

const AddImage = (props) => {
    return (
        <div>
            <h3>Add a New Image</h3>
            <form>
                <label htmlFor="image-input">Add a New Image</label>
                <input type="file" id="image-input"/>
            </form>
        </div>
    )
}

export default AddImage;