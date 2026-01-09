type Props = {
  showError: boolean;
  lengthRule: { label: string; valid: boolean };
  requirementsRules: { label: string; valid: boolean }[];
  isValid: boolean;
};

export function PasswordValidationMessage({
  showError,
  lengthRule,
  requirementsRules,
  isValid,
}: Props) {
  if (showError) {
    return (
      <div className="text-red text-inter-secondary space-y-1">
        <p>Password must contain</p>
        {!lengthRule.valid && <p>∙ {lengthRule.label}</p>}
        {requirementsRules.some((r) => !r.valid) && <p>∙ Requirements:</p>}
        {requirementsRules
          .filter((r) => !r.valid)
          .map((r) => (
            <p key={r.label}>∙ {r.label}</p>
          ))}
      </div>
    );
  }

  if (isValid) {
    return <p className="text-green text-inter-secondary">Successfully entered</p>;
  }

  return null;
}
