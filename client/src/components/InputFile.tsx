import { FC } from 'react'

interface IInputProps {
  name: string
  label: string
  id?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  multiple?: boolean
  accept?: string
}

export const InputFile: FC<IInputProps> = (props) => (
  <div className="my-3">
    {props.label && (
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
    )}
    <input
      className="form-control"
      type="file"
      name={props.name}
      id={props.id}
      onChange={props.onChange}
      multiple={props.multiple}
      accept={props.accept}
    />
  </div>
)
