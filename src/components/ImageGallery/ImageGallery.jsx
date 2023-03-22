// Список карток зображень.Створює DOM - елемент наступної структури.
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import '../styles.css';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    data: [],
    error: null,
    status: 'idle',
    // loading: false, // Показ/Хованя спінера завантаження
    page: 1,
    isShownBtn: false,
  };

  // Монтування
  componentDidMount() {
    // console.log('imageGallery componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    const { request } = this.props;
    const { page } = this.state;

    // Перевірка чи змінився запит:
    console.log(
      'prevProps.request !== request :>> ',
      prevProps.request !== request
    );
    if (prevProps.request !== request) {
      this.setState({ data: [], status: 'pending', page: 1 });
      this.getFetch();
    } else {
      console.log('page !== prevState.page :>> ', page !== prevState.page);
      if (page !== prevState.page) {
        this.getFetch();
      }
    }
  }

  // * Функція запиту
  getFetch = () => {
    const { request } = this.props;
    const { page } = this.state;

    const URL_CONST = 'https://pixabay.com/api/';
    // Клас URLSearchParams:
    const searchParams = new URLSearchParams({
      key: '34581261-d39fcdfb48adfd850ac44b9c1',
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    });

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
      .then(({ totalHits, hits }) => {
        // console.log('ImageGallery >> .then >> hits:', hits.length);
        // console.log('totalHits:', totalHits);
        // console.log(page);

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...hits],
            status: 'resolved',
            isShownBtn: true,
          };
        });
        // Ховаю кнопку Load More, якщо кількість нових об'єктів менше ніж per_page
        if (hits.length < searchParams.get('per_page')) {
          this.setState({ isShownBtn: false });
        }

        // Якщо нічого не знайдено:
        if (hits.length === 0) {
          toast.info(`Відсутні зображення за запитом "${request}"`);
          // throw new Error(`Відсутні зображення за запитом "${request}"`);
        }
      })
      // Записуємо у stat або нашу помилку (якщо !res.ok), або будь-яку іншу:
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  // * Функція кнопки LoadMore
  loadMoreBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { status, error, data, isShownBtn } = this.state;
    const { request, toggleModal } = this.props;

    if (status === 'idle') {
      // Поки запита немає (перше завантаження):
      // return <div>Введіть запит</div>;
    }
    if (status === 'pending') {
      // Спінер
      return <Loader />;
      // this.state.loading && <Loader />;
    }
    if (status === 'rejected') {
      //  Якщо є помилка (не 404 від сервера, а будь-яка інша):
      //  {this.state.error && <h1>Помилка!</h1>}
      return <h1>{`Помилка: ${error.message}`}</h1>;
    }
    if (status === 'resolved') {
      // Якщо є масив об'єктів по запиту:
      return (
        <>
          <ul className="ImageGallery">
            {data.map(({ id, webformatURL, largeImageURL }, index, array) => {
              return (
                <ImageGalleryItem
                  key={nanoid()}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  toggleModal={toggleModal}
                />
              );
            })}
          </ul>
          {isShownBtn && <Button loadMoreBtn={this.loadMoreBtnClick} />}
        </>
      );
    }
  }
}
