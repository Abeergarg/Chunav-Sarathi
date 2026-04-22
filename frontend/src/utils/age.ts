export const calculateAge = (dob: string): { age: number; isEligible: boolean } => {
  // Expected format: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dateRegex = /(\d{2})[\/\-\.](\d{2})[\/\-\.](\d{4})/;
  const match = dob.match(dateRegex);

  if (!match) {
    throw new Error("Invalid date format. Expected DD/MM/YYYY");
  }

  const birthDay = parseInt(match[1]);
  const birthMonth = parseInt(match[2]);
  const birthYear = parseInt(match[3]);

  const today = new Date();
  let age = today.getFullYear() - birthYear;
  const monthDiff = today.getMonth() + 1 - birthMonth;

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
    age--;
  }

  return {
    age,
    isEligible: age >= 18
  };
};
