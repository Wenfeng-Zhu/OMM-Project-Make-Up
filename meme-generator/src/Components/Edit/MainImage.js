import React, {useEffect, useState} from "react";

function MainImage(props) {
    const [imageUrl, setImageUrl] = useState('');
    //const [isLoaded, setIsLoaded] = useState(false);


    function loadImagesFromWebServer() {
        let url = 'http://localhost:5000/upload/' + props.memesList[props.currentIndex].url;
        setImageUrl(url);
        //use the API to increase the number of views
        fetch('http://localhost:5000/images/' + props.memesList[props.currentIndex]._id+'/view').then(error => {
            console.log(error);
        })
        //setIsLoaded(true);
    }

    // function loadImagesFromImgflip(){
    //     setImageUrl(props.memesList[props.currentIndex].url);
    //     //setIsLoaded(true);
    // }

    useEffect(() => {
        (props.sourceFromWeb) ? loadImagesFromWebServer() :  setImageUrl(props.memesList[props.currentIndex].url);
        //alert('render time')
    }, [props.sourceFromWeb,props.currentIndex])

    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else{
        //alert(imageUrl);
        return (
            <img className="image" src={imageUrl} alt="Image can not be displayed"/>
        )
    }

}

export default MainImage;