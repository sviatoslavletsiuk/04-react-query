import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  // Функція для атрибуту action (React 19 Form Actions)
  const handleFormAction = (formData: FormData) => {
    // Отримуємо значення за атрибутом name="query"
    const query = formData.get("query") as string;

    // Валідація: якщо порожньо — показуємо toast і перериваємо виконання
    if (!query || query.trim() === "") {
      toast.error("Search field is empty!");
      return;
    }

    // Викликаємо функцію пошуку з обрізаним текстом
    onSubmit(query.trim());

    // ВАЖЛИВО: Жодного form.reset()!
    // React автоматично очистить поле input, як тільки ця функція завершиться.
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <a href="/" className={s.link}>
          MovieSearch
        </a>
        {/* Використовуємо action замість onSubmit */}
        <form className={s.form} action={handleFormAction}>
          <input
            className={s.input}
            type="text"
            name="query" // Цей атрибут name критично важливий для FormData
            placeholder="Search movies..."
            autoFocus
            autoComplete="off"
          />
          <button className={s.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
