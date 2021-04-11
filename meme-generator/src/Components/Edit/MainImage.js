//the displaying image component
import React, {useEffect, useRef, useState} from "react";

function MainImage(props) {
    const [imageUrl, setImageUrl] = useState('');
    const displayingImage = useRef();

    function loadImagesFromWebServer() {
        let url = 'http://localhost:5000/upload/' + props.memesList[props.currentIndex].url;
        setImageUrl(url);
        fetch('http://localhost:5000/images/' + props.memesList[props.currentIndex]._id + '/view').then(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        props.setDisplayingImage(displayingImage.current);
        (props.sourceFromWeb) ? loadImagesFromWebServer() : setImageUrl(props.memesList[props.currentIndex].url);
    }, [props.sourceFromWeb, props.currentIndex, props.memesList])

    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <img className="image" ref={displayingImage} src={imageUrl} alt="Image can not be displayed"/>
        )
    }
}

export default MainImage;