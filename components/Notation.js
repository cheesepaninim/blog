import { RoughNotation } from 'react-rough-notation'

/*
    type:
    underline #66ff7a
    box #4a83ff
    circle #4a83ff
    highlight #fbff66
    strike-through #ff754a
    crossed-off #ff6666
*/

const Notation = ({ type, show, children }) => {
    const p = {
        underline: {
            color: '#66ff7a',
            strokeWidth: 2,
        },
        box: {
            color: '#4a83ff',
            strokeWidth: 3,
        },
        circle: {
            color: '#23ffc8',
            strokeWidth: 3,
        },
        highlight: {
            color: '#fbff66',
            strokeWidth: 1,
        },
        'strike-through': {
            color: '#ff754a',
            strokeWidth: 2,
        },
        'crossed-off': {
            color: '#ff6666',
            strokeWidth: 2,
        },
    }

    return (
        <RoughNotation
            type={type}
            show={show || true}
            color={p[type]['color']}
            strokeWidth={p[type]['strokeWidth']}
            padding={1}
        >
            {children}
        </RoughNotation>
    )
}

export default Notation
