// бібліотека реакт по іконкам
// кнопка LoadMore
// розмір зображення у модалці
import { Component } from 'react';
import './styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    showModal: false, // Відкриття/закриття модалки.
    loading: false, // Показ/Хованя спінера завантаження
    request: '0',
    largeImageURL: '',
  };

  // не використовуюється:
  // getLargeImageURL = largeImageURL => {
  //   this.setState({ largeImageURL: largeImageURL });
  // };

  // Отримання даних запросу з форми
  getRequest = requestValue => {
    this.setState({ request: requestValue });

    // такий саме запис, якщо однакова назва змінної:
    // this.setState({ requestValue });
  };

  // Відкриття/Закриття модалки.
  // ? Деструктуризація (state.showModal) - не зрозуміло нащо...
  // toggleModal = () => {
  // this.setState(({ showModal }) => ({ showModal: !showModal }));
  // largeImageURL && this.setState({ largeImageURL: largeImageURL });
  // };
  // Звичайний запис:
  toggleModal = ImageURL => {
    this.setState({ showModal: !this.state.showModal });
    ImageURL && this.setState({ largeImageURL: ImageURL });
  };

  toggleLoader = state => {
    this.setState({ loading: state }); // показую спінер
  };

  // Монтування
  componentDidMount() {
    // ^ обробка запиту:
    // const URL_CONST = 'https://pixabay.com/api/?';
    // // Клас URLSearchParams:
    // const searchParams = new URLSearchParams({
    //   key: '34581261-d39fcdfb48adfd850ac44b9c1',
    //   q: 'cat',
    //   image_type: 'photo',
    //   orientation: 'horizontal',
    //   per_page: 3,
    //   page: 1,
    // });
    // // Запит:
    // this.setState({ loading: true }); // показую спінер
    // fetch(`https://pixabay.com/api/?${searchParams}`)
    //   .then(res => res.json())
    //   .then(({ totalHits, hits }) => {
    //     hits.map(({ id, webformatURL, largeImageURL }, index, array) => {
    //       console.log(totalHits, id, webformatURL, largeImageURL);
    //     });
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false }); // прибираю спінер
    //   });
  }

  // Оновлення
  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { showModal } = this.state;

    return (
      <>
        {/* Форма пошуку: */}
        <Searchbar getRequest={this.getRequest} />

        {/* Галерея зображень */}
        <ImageGallery
          toggleModal={this.toggleModal}
          request={this.state.request}
          toggleLoader={this.toggleLoader}
          getLargeImageURL={this.getLargeImageURL}
        ></ImageGallery>

        {/* Спінер */}
        {this.state.loading && <Loader />}

        {/* Кнопка Load More */}
        <Button />

        {/* Модалка (велике зображення) */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {/* <h1>Це контент модалки (children)</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              perspiciatis, veritatis ea aliquid dignissimos exercitationem sit
              ipsam perferendis atque animi consequatur pariatur explicabo non
              dicta. Debitis velit numquam distinctio perspiciatis!
            </p> */}
            <img src={this.state.largeImageURL} alt="велике зображення" />
            {/* <button type="button" onClick={this.toggleModal}>
              Close
            </button> */}
          </Modal>
        )}

        {/* Контейнер для повідомлен: */}
        <ToastContainer newestOnTop={true} autoClose={3000} />
      </>
    );
  }
}

// ^ URL-рядок HTTP-запиту.
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// page = 1 за замовчуванням
// https://pixabay.com/api/?key=34581261-d39fcdfb48adfd850ac44b9c1&q=cat&image_type=photo&orientation=horizontal&per_page=12&page=1
// {
//   "total": 23545,
//     "totalHits": 500,
//       "hits": [
//         {
//           "id": 736877,
//           "webformatURL": "https://pixabay.com/get/g4a6354354d8286f6e0bf519832251c71b0fec0987bf6990455fd3ef64a1a5e3ede02ae893f6b4809cff89325b206da18_640.jpg",
//           "largeImageURL": "https://pixabay.com/get/g12bf5e6fcca40af6a2231de0572eb188cfa03162b486744d9edcc5f34ab8cd6f11cf4e441a07dc7025949cc2d77d14fb0b9542a8d7e93f8b64ded4124383f135_1280.jpg",
//         }]
// }

// *const URL_CONST = "https://pixabay.com/api/?"
// Клас URLSearchParams
// *const searchParams = new URLSearchParams({
//   key: '34581261-d39fcdfb48adfd850ac44b9c1',
//   q: 'cat',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
//   page: 1,
// });

// *fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });

// ^ У відповіді від апі приходить масив об'єктів, в яких тобі цікаві лише наступні властивості.
// id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна

// * componentDidMount() {
//   // console.log('Компонент App змонтувався');
//   const contactsFromLS = localStorage.getItem('contacts');
//   const contactsFromLSParced = JSON.parse(contactsFromLS);
//   // console.log('contactsFromLS:', contactsFromLS);
//   // console.log('contactsFromLSParced:', contactsFromLSParced);
//   // Перевірка, чи є щось у LS. Якщо немає, то нічого в state не додаємо.
//   contactsFromLSParced && this.setState({ contacts: contactsFromLSParced });
// }

// * componentDidUpdate(prevProps, prevState) {
//   // console.log('Компонент App оновився');
//   if (this.state.contacts !== prevState.contacts) {
//     // console.log('prevState.contacts', prevState.contacts);
//     // console.log('this.state.contacts:', this.state.contacts);
//     // console.log('оновився масив contact');
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

// * getInput = ({ target: { name, value } }) => {
//   this.setState({ [name]: value });
// };

// & Фаза монтування
// ~ componentDidMount() {} - компонент БУВ змонтований.
// Викликається один раз за життєвий цикл компоненту.
// Викликати його вдруге можна лише коли компонент був розмонтований

// & Фаза оновлення (коли змінений стан компоненту (this.state), або приходять нові props)
// ~ componentDidUpdate(prevProps, prevState, snapshot) {} - компонент БУВ оновився.
// Викликається після кожного оновлення (першого render() і всіх наступних render())
// Може викликатися скільки завгодно разів.
// Не можна в ньому (і у render()) викликати this.setState() без перевірки - буде зациклювання.
// prevProps, prevState - відповідні значення до моменту оновлення
// snapshot - те, що приходить з методу getSnapshotBeforeUpdate
// ~ static getDerivedStateFromProps(nextProps, prevState) {} - Дуже  рідко використовується
// ~ shouldComponentUpdate(nextProps, nextState) {} - чи має компонент оновлюватись?
// Використовується для оптимізації, щоб не перемальовувати рендер.

// ~ getSnapshotBeforeUpdate(prevProps, prevState) {} - Етап Pre-commit. Дуже  рідко використовується
// Читає DOM перед самим оновленням (наприклад, щоби прокрутити скрол на своє місце після додавання коментаря)

// & Фаза розмонтування
// ~ componentWillUnmount - компонент БУДЕ розмонтований
// Викликається коли компонент видаляється. Використовується для зняття слухачів подій і лічильників (.removeEventListener('type', listener), clearTimeout(timerId), clearInterval(timerId))
