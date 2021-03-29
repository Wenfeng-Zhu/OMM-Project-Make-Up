import React, {useEffect, useState} from "react";

function DisplayImage(props) {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        let url = 'http://localhost:5000/upload/' + props.memesList[props.currentIndex].filename;
        setImageUrl(url);
        fetch('http://localhost:5000/images/' + props.memesList[props.currentIndex]._id).then(error => {
            console.log(error);
        })
        //alert('render time')
    }, [props.currentIndex])
    return (
        <img className="image" src={imageUrl} alt="Image can not be displayed"/>
    )
}

export default DisplayImage;