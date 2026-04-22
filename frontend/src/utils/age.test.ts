import { calculateAge } from './age';

describe('calculateAge', () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');

  test('should return eligible for someone born 20 years ago', () => {
    const dob = `01/01/${currentYear - 20}`;
    const result = calculateAge(dob);
    expect(result.age).toBe(20);
    expect(result.isEligible).toBe(true);
  });

  test('should return not eligible for someone born 15 years ago', () => {
    const dob = `01/01/${currentYear - 15}`;
    const result = calculateAge(dob);
    expect(result.age).toBe(15);
    expect(result.isEligible).toBe(false);
  });

  test('should handle boundary case: 18th birthday today', () => {
    const dob = `${currentDay}/${currentMonth}/${currentYear - 18}`;
    const result = calculateAge(dob);
    expect(result.age).toBe(18);
    expect(result.isEligible).toBe(true);
  });

  test('should handle boundary case: 18th birthday tomorrow', () => {
    // Note: This test might be tricky if it's the last day of the month
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const birthDay = String(tomorrow.getDate()).padStart(2, '0');
    const birthMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dob = `${birthDay}/${birthMonth}/${currentYear - 18}`;
    
    const result = calculateAge(dob);
    expect(result.age).toBe(17);
    expect(result.isEligible).toBe(false);
  });

  test('should throw error for invalid format', () => {
    expect(() => calculateAge('2000/01/01')).toThrow("Invalid date format");
  });
});
