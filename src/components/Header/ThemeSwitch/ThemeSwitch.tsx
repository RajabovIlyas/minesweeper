import { memo, useEffect, useState } from 'react';
import { GameTheme } from 'enums/game-theme.enum.ts';
import { defaultTheme, insertTheme } from 'helpers/theme.helper.ts';

const ThemeSwitch = memo(() => {
  const [theme, setTheme] = useState<GameTheme>(defaultTheme());

  useEffect(() => {
    insertTheme(theme);
  },[theme])
  const changeTheme = () => {
    const newTheme = theme === GameTheme.LIGHT ? GameTheme.DARK : GameTheme.LIGHT;
    setTheme(newTheme);
    localStorage.theme = newTheme;
  };

  return (
    <div className='toggle-switch'>
      <label className='switch-label'>
        <input type='checkbox' defaultChecked={theme === GameTheme.LIGHT} className='checkbox' onClick={changeTheme} />
        <span className='slider'></span>
      </label>
    </div>
  );
});

export default ThemeSwitch
