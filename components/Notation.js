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
            color: '#d74c56',
            strokeWidth: 2,
        },
        box: {
            color: '#4a83ff',
            strokeWidth: 3,
        },
        circle: {
            color: '#51b05d',
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
        bracket: {
            color: 'orange',
            strokeWidth: 2,
            padding: 3,
            brackets: ['left', 'right'],
        },
    }

    return (
        <RoughNotation
            type={type}
            show={show || true}
            color={p[type]['color']}
            strokeWidth={p[type]['strokeWidth']}
            padding={p[type]['padding'] || 1}
            brackets={p[type]['brackets'] || ''}
        >
            {children}
        </RoughNotation>
    )
}

export default Notation
