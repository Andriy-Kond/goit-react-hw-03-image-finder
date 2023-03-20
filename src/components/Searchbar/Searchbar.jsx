// Компонент приймає один проп onSubmit – функцію для передачі значення інпута під час сабміту форми. Створює DOM-елемент наступної структури.

export const Searchbar = () => {
  return (
    <header className="Searchbar">
      <form className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
