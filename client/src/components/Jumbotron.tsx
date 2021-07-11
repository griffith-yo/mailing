import { FC, ReactNode } from 'react'

interface IJumbotronProps {
  children: ReactNode
}

export const Jumbotron: FC<IJumbotronProps> = ({ children }) => (
  <div className="p-4 mb-4 bg-gray-300 rounded-3 text-dark">{children}</div>
)
