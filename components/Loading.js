import Portal from '@/components/Portal'

const Loading = (_) => {
    return (
        <div
            className={`
            grid h-screen
            place-content-center bg-white/30 align-middle backdrop-grayscale
            `}
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
            }}
        >
            <img src={'/static/images/loading.gif'} alt={'loading image'} />
        </div>
    )
}

export default Portal(Loading)
