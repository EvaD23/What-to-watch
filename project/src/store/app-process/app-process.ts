import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/store';
import { NameSpace } from '../../const';
import { addFavoriteFilm, fetchFavoriteFilms, fetchFilms } from '../api-action';
import { Film } from '../../types/film';

const initialState: AppProcess = {
  films: [],
  genre: 'All genres',
};

export const appProcess = createSlice({
  name: NameSpace.APP,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.films = [];
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        const idToFilm = action.payload.reduce((map, film) => {
          map.set(film.id, film);
          return map;
        }, new Map<number, Film>());

        state.films.map((film) => {
          if (idToFilm.has(film.id)) {
            return idToFilm.get(film.id);
          }
          return film;
        });
      })
      .addCase(addFavoriteFilm.fulfilled, (state, action) => {
        const i = state.films.findIndex((film) => film.id === action.payload.id);
        state.films[i] = action.payload;
      });
  },
});

export const { changeGenre } = appProcess.actions;
