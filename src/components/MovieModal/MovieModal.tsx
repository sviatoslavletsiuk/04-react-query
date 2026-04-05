import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import s from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.code === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot || !movie) return null;

  return createPortal(
    <div
      className={s.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={s.modal}>
        <button className={s.closeButton} onClick={onClose}>
          ×
        </button>
        <img
          className={s.image}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.content}>
          <h2>{movie.title}</h2>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p>
            {/* ВИПРАВЛЕНО: vote_average */}
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default MovieModal;
