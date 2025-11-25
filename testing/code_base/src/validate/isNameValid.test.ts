import { validateCityName } from './validateCity';

describe('isNameValid', () => {
    it('Возвращает false, если пустая строка', () => {
        const result = validateCityName('');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает true, если введен один символ', () => {
        const result = validateCityName(' ');
        expect(result.isValid).toBeTruthy();
    });

    it('Возвращает false, если на входе Escape-символы', () => {
        const result = validateCityName('Alex&');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе не валидные символы', () => {
        const result = validateCityName('Москва');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе скрипт', () => {
        const result = validateCityName("<script>alert('XSS')</script>");
        expect(result.isValid).toBeFalsy();
    });
})  