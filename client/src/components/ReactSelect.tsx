import { FC } from 'react'
import Select from 'react-select'

interface IReactSelectProps {
  onChange: (value: any) => void
  options: { value: string; label: string }[]
  name: string
  id: string
  value?: { value: string; label: string }[]
  label: string
  isMulti: boolean
}

export const ReactSelect: FC<IReactSelectProps> = (props) => (
  <div className="form-floating">
    <Select
      className="mb-3"
      styles={{
        control: (provided) => ({
          ...provided,
          paddingLeft: '0.1rem',
          paddingTop: '1.5rem',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 10,
        }),
      }}
      placeholder="Выбрать..."
      closeMenuOnSelect={false}
      options={props.options}
      name={props.name}
      id={props.id}
      value={props.value}
      isMulti={props.isMulti}
      onChange={props.onChange}
    />
    <label
      htmlFor={props.id}
      className="text-dark"
      style={{
        opacity: '0.65',
        transform: 'scale(0.85) translateY(-0.5rem) translateX(0.15rem)',
      }}
    >
      {props.label}
    </label>
  </div>
)
