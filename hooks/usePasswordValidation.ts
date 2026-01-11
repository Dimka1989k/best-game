export function usePasswordValidation(password: string) {
  const lengthRule = {
    label: 'Minimum length: 8–12 characters',
    valid: password.length >= 8 && password.length <= 12,
  };

  const requirementsRules = [
    { label: 'At least one uppercase letter (A–Z)', valid: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter (a–z)', valid: /[a-z]/.test(password) },
    { label: 'At least one number (0–9)', valid: /[0-9]/.test(password) },
    { label: 'At least one special character (!@#$%^&*)', valid: /[!@#$%^&*]/.test(password) },
  ];

  const isValid =
    password.length > 0 && lengthRule.valid && requirementsRules.every((rule) => rule.valid);

  return {
    lengthRule,
    requirementsRules,
    isValid,
  };
}
