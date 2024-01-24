import { FunctionComponent } from 'react'

export const Button: FunctionComponent = () => {
  return (
    <button className="text-xs" onClick={() => alert('button')}>
      我是按钮我需要类型
    </button>
  )
}
