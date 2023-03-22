// Компонент спінера відображається, доки відбувається завантаження зображень.
import { ColorRing } from 'react-loader-spinner';
import '../styles.css';

export const Loader = () => {
  // No css import is required
  return (
    <div className="Loader">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};

// Спінери
// <ColorRing
//   visible={true}
//   height="80"
//   width="80"
//   ariaLabel="blocks-loading"
//   wrapperStyle={{}}
//   wrapperClass="blocks-wrapper"
//   colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
// />

// <RotatingLines
//   strokeColor="grey"
//   strokeWidth="5"
//   animationDuration="0.75"
//   width="96"
//   visible={true}
//   />

//   <RotatingSquare
//   height="100"
//   width="100"
//   color="#4fa94d"
//   ariaLabel="rotating-square-loading"
//   strokeWidth="4"
//   wrapperStyle={{}}
//   wrapperClass=""
//   visible={true}
// />
