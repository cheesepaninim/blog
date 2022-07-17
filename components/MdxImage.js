import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }) => (
    <>
        <p align="center" className="text-amber-400">
            {' '}
            •{' '}
        </p>
        <div className="img-box">
            <p align={'center'} className={'bg-white'}>
                <NextImage {...rest} />
            </p>
        </div>
        <p align="center" className="text-amber-600">
            {' '}
            •{' '}
        </p>
    </>
)

export default Image
