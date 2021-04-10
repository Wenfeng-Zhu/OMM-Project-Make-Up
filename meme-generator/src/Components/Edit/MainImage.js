import React, {useEffect, useRef, useState} from "react";

function MainImage(props) {
    const [imageUrl, setImageUrl] = useState('');
    //const [isLoaded, setIsLoaded] = useState(false);
    const displayingImage = useRef();


    function loadImagesFromWebServer() {
        let url = 'http://localhost:5000/upload/' + props.memesList[props.currentIndex].url;
        setImageUrl(url);
        //use the API to increase the number of views
        // alert('test')
        fetch('http://localhost:5000/images/' + props.memesList[props.currentIndex]._id).then(error => {
            console.log(error);
        })
        //setIsLoaded(true);
    }

    // function loadImagesFromImgflip(){
    //     setImageUrl(props.memesList[props.currentIndex].url);
    //     //setIsLoaded(true);
    // }

    useEffect(() => {
        props.setDisplayingImage(displayingImage.current);
        (props.sourceFromWeb) ? loadImagesFromWebServer() :  setImageUrl(props.memesList[props.currentIndex].url);
        //alert('render time')
    }, [props.sourceFromWeb,props.currentIndex,props.memesList])

    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else{
        //alert(imageUrl);
        return (
            <img className="image" ref={displayingImage} src={imageUrl} alt="Image can not be displayed"/>
        )
    }

}

export default MainImage;