import { useReducer, useEffect } from 'react';
import { TConverter, Action } from './types';

// редьюсер для обработки действий
const reducer = (state: TConverter, action: Action) => {
  switch (action.type) {
    case 'SET_HEX':
      return { ...state, hex: action.payload };
    case 'SET_RGB_TEXT':
      return { ...state, rgbText: action.payload };
    case 'SET_COLOR':
      return { ...state, color: action.payload };
    case 'SET_RGB_BACKGROUND':
      return { ...state, rgbBackground: action.payload };
    default:
      return state;
  }
};

const Converter = () => {
  // используем useReducer для управления состоянием
  const [state, dispatch] = useReducer(reducer, {
    hex: '',
    rgbText: '',
    color: '',
    rgbBackground: '',
  });

  const isValidHex = (hex: string): boolean => /^#([0-9a-f]{6})$/i.test(hex);

  const hexToRgb = (hex: string): string => {
    const hexColor = hex.slice(1); // Убираем #
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // обработчик изменения HEX
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;

    let rgbText = '';
    let color = '';
    let rgbBackground = '';

    if (isValidHex(hex)) {
      rgbText = hexToRgb(hex);
      color = hex;
      rgbBackground = 'rgba(0, 0, 0, 0.4)';
    } else if (hex.length >= 7) {
      rgbText = 'Ошибка!';
      color = '#eb442f';
      rgbBackground = 'rgba(0, 0, 0, 0.4)';
    }

    // обновляем состояния
    dispatch({ type: 'SET_HEX', payload: hex });
    dispatch({ type: 'SET_RGB_TEXT', payload: rgbText });
    dispatch({ type: 'SET_COLOR', payload: color });
    dispatch({ type: 'SET_RGB_BACKGROUND', payload: rgbBackground });
  }

  // эффект для изменения фона страницы
  useEffect(() => {
    document.body.style.backgroundColor = state.color;
  }, [state.color]); // фон изменяем при изменении цвета

  return (
    <div className='converter'>
      <form className='form'>
        <input
          className='input-field'
          id='hex'
          name='hex'
          type='text'
          maxLength={7}
          autoFocus
          value={state.hex}
          onChange={handleHexChange}
          placeholder='Введите HEX'
        />
      </form>
      <div className='output-field' style={{ backgroundColor: state.rgbBackground }}>
        <span>{state.rgbText}</span>
      </div>
    </div>
  );
}

export default Converter;
