import React from 'react'
 
const SvgrMock = React.forwardRef<HTMLSpanElement, React.PropsWithChildren<any>>((props, ref) => <span ref={ref} {...props} />)

export const ReactComponent = SvgrMock
export default SvgrMock