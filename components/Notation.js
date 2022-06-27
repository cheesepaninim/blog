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
            strokeWidth: 5,
        },
        circle: {
            color: '#4a83ff',
            strokeWidth: 5,
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
            strokeWidth: 3,
        },
    }

    return (
        <RoughNotation
            type={type}
            show={show || true}
            color={p[type]['color']}
            strokeWidth={p[type]['strokeWidth']}
            padding={5}
        >
            {children}
        </RoughNotation>
    )
}

export default Notation
