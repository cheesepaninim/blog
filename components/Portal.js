import reactDom from 'react-dom'

const Portal = (Component) => (props) => {
    const el = document.getElementById('portal')
    return reactDom.createPortal(<Component {...props} />, el)
}

export default Portal
