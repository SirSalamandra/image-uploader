import Card from "../Card/Card";
import './LoadingScreen.css'

const LoadingScreen = () => {
  return (
    <div>
      <Card>
        <div id='loading-container'>
          <h3>Uploading...</h3>
          <progress></progress>
        </div>
      </Card>
    </div>
  );
}

export default LoadingScreen;