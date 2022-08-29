import React from 'react';
import './ImageUploader.css'
import ImagePlaceholder from '../../assets/image.svg';
import Card from '../Card/Card';
import { type } from 'os';

const ImageUploader: React.FC<{ uploadFile: (file: File) => void }> = (props) => {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }
    else setDragActive(false);
  };

  const handleDragDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    uploadImage(e.dataTransfer.files);
    // console.log('drag drop', e.dataTransfer.files as FileList);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    uploadImage(e.target.files as FileList);
    // console.log('change', e.target.files as FileList);
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const input = document.getElementById('input-file-upload') as HTMLInputElement;
    input.click();
  }

  const uploadImage = (fileList: FileList) => {
    if (fileList[0].type.indexOf('image/') < 0) return;

    if (fileList && fileList[0]) {
      const image = fileList[0];
      console.log('Handle Change', image);

      props.uploadFile(image);
    }
  }

  return (
    <div id='root'>
      <Card>
        <form id="form-file-upload"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <h2>Upload your image</h2>
          <label style={{ fontSize: '.8rem', color: 'gray' }}>File should be Jpeg, Png...</label>

          <input id='input-file-upload' type={'file'} accept='image/*' onChange={handleChange} />

          <label htmlFor="input-file-upload" onClick={(e: React.MouseEvent) => e.preventDefault()} onDragEnter={handleDrag}>
            <div id='drag-drop-container'>
              <img src={ImagePlaceholder} alt="" />
              <label style={{ fontSize: '.8rem', color: 'gray' }}>Drag & Drop your image here</label>
            </div>

            {dragActive &&
              <div
                id="drag-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDragDrop}
              >
              </div>
            }
          </label>
          <div id='button-container'>
            <label style={{ fontSize: '1rem', color: 'gray' }}>Or</label>
            <div>
              <button id='choose-file-button' onClick={handleButtonClick}>Choose a File</button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ImageUploader;