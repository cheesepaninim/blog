import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }) => <div className="img-box"><NextImage {...rest} /></div>

export default Image
