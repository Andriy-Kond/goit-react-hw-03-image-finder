// Компонент приймає один проп onSubmit – функцію для передачі значення інпута під час сабміту форми. Створює DOM-елемент наступної структури.
import { Component } from 'react';
import { toast } from 'react-toastify'; // повідомлення по типу Notify
import { FiSearch } from 'react-icons/fi'; // іконки React-Icons

// import '../styles.css';

export class Searchbar extends Component {
  state = {
    requestValue: '',
  };

  handleRequestChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value.toLowerCase() });
  };

  handleRequestSubmit = e => {
    e.preventDefault();

    if (this.state.requestValue.trim() === '') {
      // alert('введіть щось для пошуку');
      // замість алерту - react-toastify:
      toast.error('введіть щось для пошуку');
      return;
    }
    this.props.onSubmit(this.state.requestValue.trim());

    this.setState({ requestValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleRequestSubmit}>
          <button type="submit" className="SearchForm-button">
            <FiSearch className="SearchForm-button-icon" />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="requestValue"
            value={this.state.requestValue}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}
