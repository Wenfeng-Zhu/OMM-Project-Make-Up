import React, {useEffect, useState} from "react";

function MainImage(props) {
    const [imageUrl, setImageUrl] = useState('');

    function loadImagesFromWebServer() {
        let url = 'http://localhost:5000/upload/' + props.memesList[props.currentIndex].url;
        setImageUrl(url);
        //use the API to increase the number of views
        fetch('http://localhost:5000/images/' + props.memesList[props.currentIndex]._id).then(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        (props.sourceFromWeb) ? loadImagesFromWebServer() : (setImageUrl(props.memesList[props.currentIndex].url))
        //alert('render time')
    }, [props.sourceFromWeb,props.currentIndex])
    return (
        <img className="image" src={imageUrl} alt="Image can not be displayed"/>
    )
}

export default MainImage;