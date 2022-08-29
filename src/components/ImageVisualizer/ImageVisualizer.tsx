import classes from './ImageVisualizer.module.css';
import React, { useEffect } from "react";
import Card from "../Card/Card";

const ImageVisualizer: React.FC<{ imageFile: File | undefined, imageUrl: string }> = (prop) => {
  const previewImageRef = React.createRef<HTMLImageElement>();
  const copyButtonRef = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (data) => {
      const image = previewImageRef.current!;
      image.src = data.target?.result as string;
    }

    reader.readAsDataURL(prop.imageFile!);
  }, [previewImageRef, prop.imageFile]);

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    navigator.clipboard.writeText(prop.imageUrl).then(() => {
      const button = copyButtonRef.current!;

      button.style.backgroundColor = "#219653";

      setTimeout(() => {
        button.style.backgroundColor = "#2f80ed";
      }, 5000);
    })
  }

  return (
    <div>
      <Card>
        <div id='main' className={classes.main}>
          <span className={classes['material-symbols-outlined']}>check_circle</span>
          <h3>Uploaded Successfully!</h3>
          <div>
            <img className={classes.image} ref={previewImageRef} alt='' style={{ width: '100%' }} />
          </div>
          <div className={classes['button-container']}>
            <input className={classes['input-url']} value={prop.imageUrl} readOnly />
            <button
              ref={copyButtonRef}
              className={classes['button-copy-url']}
              onClick={handleCopyClick}
            >Copy Link</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ImageVisualizer;