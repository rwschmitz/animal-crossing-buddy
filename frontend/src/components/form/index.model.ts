export interface FormProps {
  title: string;
  labels: FormLabels[];
  submitBtnText: string;
  onSubmit: Function;
}

interface FormLabels {
  label: string;
}
