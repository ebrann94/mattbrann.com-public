import React from 'react';
import '../styles/ImagePreview.css';

const ImagePreview = (props) => {
    return (
        <div>
            <h3>Images</h3>
            <div className="thumbnails">
                {
                    props.images.map((image, index) => {
                        return  <img 
                                    key={index}
                                    src={`/images/${props.section}/${props.name}/${image}`} 
                                    alt="project" 
                                    className="thumbnail"
                                />
                    })
                }
            </div>
        </div>
    )
}

export default ImagePreview;