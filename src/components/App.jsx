import { Component } from 'react';
import './styles.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    showModal: false, // Відкриття/закриття модалки.
  };

  // Монтування
  componentDidMount() {}

  // Оновлення
  componentDidUpdate(prevProps, prevState) {}

  // Відкриття/Закриття модалки.
  // ? Деструктуризація (state.showModal) - не зрозуміло нащо...
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  // Звичайний запис:
  // toggleModal = () => {
  //   this.setState({ showModal: !this.state.showModal });
  // };

  render() {
    const { showModal } = this.state;

    return (
      <>
        {/* <Searchbar /> */}
        {/* <ImageGallery /> */}
        <ImageGalleryItem toggleModal={this.toggleModal} />
        {/* <Loader /> */}
        {/* <Button /> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Це контент модалки (children)</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              perspiciatis, veritatis ea aliquid dignissimos exercitationem sit
              ipsam perferendis atque animi consequatur pariatur explicabo non
              dicta. Debitis velit numquam distinctio perspiciatis!
            </p>
            <img src="http" alt="велике зображення" />
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </Modal>
        )}
      </>
    );
  }
}

// ^ URL-рядок HTTP-запиту.
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// page = 1 за замовчуванням

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
