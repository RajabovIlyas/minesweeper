import { GameTheme } from 'enums/game-theme.enum.ts';

export const insertTheme = (theme?: GameTheme) => {

  if ((!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) || theme === GameTheme.DARK) {
    document.documentElement.classList.add('dark');
    return;
  }

  document.documentElement.classList.remove('dark');
};

export const defaultTheme = (): GameTheme => {
  return localStorage.theme ?
    localStorage.theme :
    window.matchMedia('(prefers-color-scheme: dark)').matches ?
      GameTheme.DARK :
      GameTheme.LIGHT;
};
