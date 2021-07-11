import { ChangeEvent, FC } from 'react'

interface IBootstrapSelectProps {
  spacing?: string
  name: string
  inputClassName?: string
  id?: string
  placeholder: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  value: string
  required?: boolean
  multiple?: boolean
  options: Array<string>
}

export const BootstrapSelect: FC<IBootstrapSelectProps> = (props) => {
  return (
    <div className={`form-floating ${props.spacing || 'mb-3'}`}>
      <select
        className={props.inputClassName || 'form-control'}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value ? props.value : props.options[0]}
        required={props.required}
        multiple={props.multiple}
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label className="text-dark" htmlFor={props.id}>
        {props.placeholder}
      </label>
    </div>
  )
}
