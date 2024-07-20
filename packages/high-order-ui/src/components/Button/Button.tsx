import './index.css'
import classNames from 'classnames'

export function Button() {
  return (
    <div
      style={{
        border: '1px solid #3d3',
      }}
      className={classNames('w-10 h-10', 'blue')}
    >
      button
    </div>
  )
}
