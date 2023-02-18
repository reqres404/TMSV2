import Lottie from 'react-lottie';
import bus from './bus.json'

export default function Bus() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: bus,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
  }