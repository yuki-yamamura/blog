/**
 * A tiny shared signal that lets any component send a gust of wind to listeners such as the wind chime.
 */
const state = $state({ gust: 0 });

export const wind = {
  blow() {
    state.gust += 1;
  },

  get gust() {
    return state.gust;
  },
};
