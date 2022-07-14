import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }) => (
  <>
    <p align="center" className="text-slate-200"> • </p>
    <div className="img-box">
      <NextImage {...rest} />
    </div>
    <p align="center" className="text-slate-200"> • </p>
  </>
)

export default Image
