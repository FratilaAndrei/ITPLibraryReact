import { Checkbox } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FC, useState } from "react";

type Props = {
  title: string;
  option: boolean;
  optionLabel?: string;
  hasInputFields: boolean;
  paymentTypeData?: string[];
};

const INPUT_ARRAY_DATA = [
  {
    id: 1,
    inputType: "text",
    placeholder: "Adress",
  },
  {
    id: 2,
    inputType: "number",
    placeholder: "Phone Number",
  },
];
type City = {
  name: string;
  code: string;
};

//TODO Mare refactorizare sa fie cat mai bun, momentan merge

const AdressInput: FC<Props> = ({
  title,
  option,
  optionLabel,
  hasInputFields,
  paymentTypeData,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
      <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
        {title}
      </div>
      {hasInputFields && (
        <div className="w-full flex flex-col gap-y-4 text-sm">
          <Dropdown
            value={selectedCity}
            onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Country Selection"
            className="w-full md:w-14rem border border-border-color text-order-input"
          />
          {INPUT_ARRAY_DATA.map((data) => (
            <input
              key={data.id}
              type={data.inputType}
              placeholder={data.placeholder}
              required
              className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 text-base border outline-none"
            />
          ))}
        </div>
      )}
      {option && (
        <div className="flex gap-x-2 items-center">
          <Checkbox
            onChange={(e) =>
              setChecked(e.checked != undefined ? e.checked : false)
            }
            checked={checked}
            pt={{
              box: {
                className: "border border-border-color",
              },
            }}
          />
          <div className="font-roboto font-normal fullHd:text-sm text-gray-color">
            {optionLabel}
          </div>
        </div>
      )}
      {paymentTypeData && (
        <div className="flex gap-x-4">
          {paymentTypeData.map((data) => (
            <div className="flex gap-x-2 items-center" key={data}>
              <Checkbox
                onChange={(e) =>
                  setChecked(e.checked != undefined ? e.checked : false)
                }
                checked={checked}
                pt={{
                  box: {
                    className: "border border-border-color",
                  },
                }}
              />
              <div className="font-roboto font-normal fullHd:text-sm text-gray-color">
                {data}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdressInput;
