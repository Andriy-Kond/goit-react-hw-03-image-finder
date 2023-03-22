// Список карток зображень.Створює DOM - елемент наступної структури.
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import '../styles.css';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { FaBeer } from 'react-icons/fa';

export class ImageGallery extends Component {
  state = {
    data: [],
    hits: [], // ^ Спроба оновлювати не всі картки, а додавати нові до старих без оновлення всієї data.
    error: null,
    status: '',
    page: 1,
    isShownBtn: false,
    isLoading: false, // показ спінера і деактивація кнопки Load More
  };

  // * Функція запиту
  getFetch = () => {
    const { request } = this.props;
    const { page } = this.state;

    const URL_CONST = 'https://pixabay.com/api/';
    // Клас URLSearchParams:
    const searchParams = new URLSearchParams({
      key: '34581261-d39fcdfb48adfd850ac44b9c1',
      q: request, // запит
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12, // сторінок за один запит
      page: page, // сторінка у state (змінюється кнопкою Load More, або скидається новим запитом)
    });

    this.setState({ isLoading: true }); // показую спінер і деактивую кнопку Load More
    fetch(`${URL_CONST}?${searchParams}`)
      .then(res => {
        // Якщо API відповіло з помилкою 404, то ми відловлюємо її тут
        if (res.ok) {
          return res.json();
        }
        // Якщо відповідь 404 від сервера, то робимо новий об'єкт помилки з необхідним повідомленням:
        return Promise.reject(
          new Error(`Якась помилка на сервері, спробуйте пізніше`)
        );
      })
      // Отримуємо масив об'єктів (дані)
      .then(({ totalHits, hits }) => {
        // console.log('hits.length:', hits.length);
        // console.log('totalHits:', totalHits);
        // console.log("page", page);

        // Якщо нічого не знайдено, то виходжу
        if (hits.length === 0) {
          return toast.info(`Відсутні зображення за запитом "${request}"`);
          // throw new Error(`Відсутні зображення за запитом "${request}"`);
        }

        // Ховаю кнопку Load More, якщо кількість нових об'єктів менше ніж per_page (тобто вони закінчились на сервері)
        if (hits.length < searchParams.get('per_page')) {
          this.setState({ isShownBtn: false });
        }

        // Оновлюю стейт
        this.setState(prevState => {
          return {
            data: [...prevState.data, ...hits], // старі дані + нові
            hits: [...hits], // дані в цьому запиту (макс 12 об'єктів)
            // status: 'resolved',
            isShownBtn: true, // показую кнопку Load More
          };
        });
      })
      // Записуємо у stat або нашу помилку (якщо !res.ok), або будь-яку іншу:
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        // ховаю спінер (і активую кнопку Load More)
        this.setState({ isLoading: false });
      });
  };

  // * Функція кнопки LoadMore
  loadMoreBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  // // Монтування
  // componentDidMount() {
  //   // console.log('imageGallery componentDidMount');
  // }

  componentDidUpdate(prevProps, prevState) {
    const { request } = this.props;
    const { page } = this.state;

    // Якщо запит змінився, то скидаємо state і робимо запит:
    if (prevProps.request !== request) {
      this.setState({ data: [], page: 1, isShownBtn: false });
      this.getFetch();
    }

    // Якщо запит не змінився, а сторінка змінилась (була натиснута кнопка Load More), то робимо запит
    else {
      if (page !== prevState.page) {
        this.getFetch();
      }
    }
  }

  render() {
    const { status, error, data, isShownBtn, hits, isLoading } = this.state;
    const { request, toggleModal } = this.props;

    if (status === 'rejected') {
      //  Якщо є помилка (не 404 від сервера, а будь-яка інша):
      //  {this.state.error && <h1>Помилка!</h1>}
      return <h1>{`Помилка: ${error.message}`}</h1>;
    }

    // if (status === 'resolved') {
    // прибрав 'resolved' щоби loader показувався внизу під картками зображень. Якщо робити ще один статус ("pending"), то всі картки будуть зникати, а спінер буде показуватись зверху на сторінці без карток.
    // Якщо є масив об'єктів по запиту:
    return (
      <>
        <ul className="ImageGallery">
          {data.map(
            ({ id, webformatURL, largeImageURL, tags }, index, array) => {
              return (
                <ImageGalleryItem
                  key={nanoid()}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  toggleModal={toggleModal}
                  tags={tags}
                />
              );
            }
          )}
        </ul>

        {isLoading && <Loader />}
        {isShownBtn && (
          <Button loadMoreBtn={this.loadMoreBtnClick} isLoading={isLoading} />
        )}
      </>
    );
    // }
  }
}
