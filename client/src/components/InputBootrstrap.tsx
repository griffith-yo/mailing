import { FC } from 'react'

interface IInputBootstrapProps {
  spacing?: string
  type?: string
  name: string
  id?: string
  placeholder: string
  help?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  required?: boolean
}

export const InputBootstrap: FC<IInputBootstrapProps> = (props) => {
  return (
    <div className={props.spacing}>
      <label className="form-label">{props.placeholder}</label>
      <input
        type={props.type || 'text'}
        onChange={props.onChange}
        className="form-control"
        name={props.name}
        id={props.id}
        value={props.value}
        required={props.required}
      />
      <div className="form-text">{props.help}</div>
    </div>
  )
}
