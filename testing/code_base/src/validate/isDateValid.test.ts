import { validateDate } from './validateDate';

describe('isDateValid', () => {
    it('Возвращает false, если на входе пустая строка', () => {
        const result = validateDate('');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе пробел', () => {
        const result = validateDate(' ');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе не валидные символы', () => {
        const result = validateDate('вторник');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе неправильная разрядность', () => {
        const result = validateDate('10.10.10');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе неправильный формат даты', () => {
        const result = validateDate('01.10.YYYY');
        expect(result.isValid).toBeFalsy();
    });

    it('Возвращает false, если на входе дата меньше текущей', () => {
        const result = validateDate('01.11.2025');
        expect(result.isValid).toBeFalsy();
    });
})