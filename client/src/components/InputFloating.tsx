import { ChangeEvent } from 'react'
import { FC } from 'react'

interface IInputFloatingProps {
  spacing?: string
  type?: string
  name: string
  id?: string
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  required: boolean
}

export const InputFloating: FC<IInputFloatingProps> = (props) => {
  return (
    <div className={`form-floating ${props.spacing}`}>
      <input
        type={props.type || 'text'}
        className="form-control"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
      />
      <label className="text-dark">{props.placeholder}</label>
    </div>
  )
}
