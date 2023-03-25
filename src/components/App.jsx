import { Component } from 'react';
import './styles.css';
import { ToastContainer } from 'react-toastify'; // повідомлення
import 'react-toastify/dist/ReactToastify.css'; // стилі повідомлень

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    request: '',
  };

  // Отримання даних запиту з форми
  onSubmit = requestValue => {
    this.setState({ request: requestValue });
  };

  render() {
    return (
      <>

      </>
    );
  }
}
