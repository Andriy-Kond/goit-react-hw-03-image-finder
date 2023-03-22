// При натисканні на кнопку Load more повинна довантажуватись наступна порція зображень і рендеритися разом із попередніми. Кнопка повинна рендеритися лише тоді, коли є якісь завантажені зображення. Якщо масив зображень порожній, кнопка не рендериться.
import '../styles.css';

export const Button = ({ loadMoreBtn }) => {
  return (
    <button className="Button" onClick={loadMoreBtn}>
      Load More
    </button>
  );
};
