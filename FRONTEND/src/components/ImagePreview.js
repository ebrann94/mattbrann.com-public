import React from 'react';

const ImagePreview = (props) => {
    return (
        <div>
            <h3>Images</h3>
            <div className="thumbnails">
                {
                    props.images.map((image, index) => {
                        return  <img 
                                    key={index}
                                    src={`/images/${props.section}/${props.project}/${image}`} 
                                    alt="project" 
                                    height="50px" 
                                    width="50px"
                                />
                    })
                }
            </div>
        </div>
    )
}

export default ImagePreview;