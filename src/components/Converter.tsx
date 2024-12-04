import {useState} from 'react';
import {ConverterType} from './types';

const Converter = () => {
    const [state, setState] = useState<ConverterType>({
        hex: '',
        rgbText: '',
        color: '',
        rgbBackground: '',
    });

    const isValidHex = (hex: string) => {
        return /^#([0-9a-f]{6})$/i.test(hex);
    }
    
    const hexToRgb = (hex: string) => {
        const hexColor = hex.slice(1);
        const r = parseInt(hexColor.slice(0, 2), 16);
        const g = parseInt(hexColor.slice(2, 4), 16);
        const b = parseInt(hexColor.slice(4, 6), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setState(prevState => ({...prevState, hex: value}));

        if (isValidHex(value)) {
            setState(prevState => ({...prevState, rgbText: hexToRgb(value), color: value, rgbBackground: 'rgba(0, 0, 0, 0.4)'}));
        } else if (value.length >= 7) {
            setState(prevState => ({...prevState, rgbText: 'Ошибка!', color: '#eb442f', rgbBackground: 'rgba(0, 0, 0, 0.4)'}));
        } else {
            setState(prevState => ({...prevState, rgbText: '', color: '', rgbBackground: ''}));
        }
    }

    document.body.style.backgroundColor = state.color;

    return (
        <div className='converter'>
            <form className='form'>
                <input className='input-field'
                    id='hex'
                    name='hex'
                    type='text'
                    value={state.hex}
                    onChange={handleHexChange}
                    placeholder='Введите HEX'
                />
            </form>
            <div className='output-field' style={{backgroundColor: state.rgbBackground}}>
                <span>{state.rgbText}</span>
            </div>
        </div>
    );
}

export default Converter;
