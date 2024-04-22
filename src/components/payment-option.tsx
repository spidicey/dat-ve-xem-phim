import { MoMo, Vnpay } from "./logo";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type PaymentOptionProps = {
  value: string;
  id: string;
  label: string;
  Icon: React.ComponentType;
};
export default function PaymentOption({ value, id, label, Icon } : PaymentOptionProps) {
  return (
    <div className="flex h-14 items-center space-x-2 bg-white">
      <RadioGroupItem value={value} id={id} />
      <Icon />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

// Usage
