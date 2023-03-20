// Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.
export const ImageGalleryItem = ({ toggleModal }) => {
  return (
    <li className="ImageGalleryItem" onClick={toggleModal}>
      <img src="http" alt="small img" />
    </li>
  );
};
