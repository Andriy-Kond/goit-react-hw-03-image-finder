import { Component } from 'react';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css'; // стилі повідомлень

export class App extends Component {
  state = {
    request: '',
  };

  // Отримання даних запиту з форми
  onSubmit = requestValue => {
    this.setState({ request: requestValue });
  };

  render() {
    return <></>;
  }
}
