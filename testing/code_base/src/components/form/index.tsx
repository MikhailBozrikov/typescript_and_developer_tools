import { ChangeEvent, SetStateAction, useState } from 'react';

import './index.css';
import { VARIABLES } from '../../utils/stub';
import { validateCityName } from '../../validate/validateCity';
import { validateDate } from '../../validate/validateDate';
import { Booking } from '../../utils/generateBookings';

function MyForm(props: { setResults: React.Dispatch<SetStateAction<Booking[]>> }): React.JSX.Element {
  const [textInput, setTextInput] = useState('');
  const [dateInput1, setDateInput1] = useState('');
  const [dateInput2, setDateInput2] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorDate1, setErrorDate1] = useState('');
  const [errorDate2, setErrorDate2] = useState('');

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTextInput(value);
    const validation = validateCityName(value);
    setErrorCity(validation.isValid ? '' : validation.message);
  };

  const handleDateInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<SetStateAction<string>>,
    setError: React.Dispatch<SetStateAction<string>>
  ) => {
    const raw = event.target.value.replace(/\D/g, '');
    const parts = [];

    if (raw.length > 0) parts.push(raw.substring(0, 2));
    if (raw.length > 2) parts.push(raw.substring(2, 4));
    if (raw.length > 4) parts.push(raw.substring(4, 8));

    const formatted = parts.join('.');
    setDate(formatted);

    const validation = validateDate(formatted);
    setError(validation.isValid ? '' : validation.message);
  };

  const findItems = (text: string, date1 = '', date2 = '') => {
    const results = VARIABLES.filter((booking) => {
      const matchesText = booking.location.toLowerCase().includes(text.toLowerCase());
      const matchesDate1 = date1 === '' || booking.checkIn === date1;
      const matchesDate2 = date2 === '' || booking.checkOut === date2;
      return matchesText && matchesDate1 && matchesDate2;
    });

    props.setResults(results);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    findItems(textInput, dateInput1, dateInput2);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      style={{ maxWidth: '300px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <div className="item">
        <label htmlFor="textInput" className="label">Куда отправимся?</label>
        <input
          className="input"
          type="text"
          id="textInput"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Введите текст"
          autoComplete="off"
        />
        {errorCity && <p className="error">{errorCity}</p>}
      </div>

      <div className="item">
        <label htmlFor="dateInput1" className="label">Дата заезда:</label>
        <input
          className="input"
          type="text"
          id="dateInput1"
          value={dateInput1}
          onChange={(e) => handleDateInputChange(e, setDateInput1, setErrorDate1)}
          placeholder="ДД.ММ.ГГГГ"
          maxLength={10}
        />
        {errorDate1 && <p className="error">{errorDate1}</p>}
      </div>

      <div className="item">
        <label htmlFor="dateInput2" className="label">Дата выезда:</label>
        <input
          className="input"
          type="text"
          id="dateInput2"
          value={dateInput2}
          onChange={(e) => handleDateInputChange(e, setDateInput2, setErrorDate2)}
          placeholder="ДД.ММ.ГГГГ"
          maxLength={10}
        />
        {errorDate2 && <p className="error">{errorDate2}</p>}
      </div>

      <button
        type="submit"
        className="create-button"
        disabled={!textInput || !!errorCity || !!errorDate1 || !!errorDate2}
      >
        Найти
      </button>
    </form>
  );
}

export default MyForm;
