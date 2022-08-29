import { useState } from 'react';

import './App.css';
import ImageUploader from './components/ImageUploader/ImageUploader';
import ImageVisualizer from './components/ImageVisualizer/ImageVisualizer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

function App() {
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");

  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const uploadFile = (file: File) => {
    console.log("Uploading this file: ", file);

    setImage(file);
    setUploadingFile(true);

    const formData = new FormData();
    formData.append('image', file);

    fakeUpload(file?.name);

    // fetch("https://localhost:7114/WeatherForecast", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(response => {

    //     if (response.ok) return response.json();
    //   })
    //   .then(data => {
    //     uploadedWithSuccess(data.data.imageUrl);
    //   })
    //   .catch(err => {
    //     uploadedWithSuccess(`no-backend-connected.com/${file.name}`);
    //   })
  };

  const fakeUpload = (fileName: string) => {
    setTimeout(() => {
      uploadedWithSuccess(`no-backend-connected/${fileName}`);
    }, 3000);
  }

  const uploadedWithSuccess = (imageUrl: string) => {
    setImageUrl(imageUrl);

    setUploadingFile(false);
    setFileUploaded(true);
  }

  return (
    <div className="App">

      {(!uploadingFile && !fileUploaded) && <ImageUploader uploadFile={uploadFile} />}
      {uploadingFile && <LoadingScreen />}
      {(!uploadingFile && fileUploaded) && <ImageVisualizer imageFile={image} imageUrl={imageUrl} />}
    </div>
  );
}

export default App;