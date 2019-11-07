import React from 'react';
import PropTypes from 'prop-types';

import './TextSequence.css';

const propTypes = {
    data: PropTypes.shape({
        rows: PropTypes.array,
        columns: PropTypes.array
    }),
    subheader: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
};

const defaultProps = {
    width: 500,
    height: 500,
    data: []
};

class TextSequence extends  React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.data.rows,
            columns: props.data.columns,

        }
    }
    componentDidMount() {
        console.log("text-mounted");
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("receive props", nextProps);
    }

    render() {
        const data = this.props.data;
        const subheader = this.props.subheader;
        const rv = [];

        data.row.forEach(function (row, i) {
            const para = data.columns.reduce(function (prev, cur, index) {
                prev[cur] = row[index]
                return prev
            }, {});

            let lis =Object.keys(para).map((keyItem, keyIndex) => {
                return (
                    <p key={keyIndex} className="text-sequence_name">{para[keyItem]}</p>
                )
            })

            rv.push(<li className="text-sequence_content" key={i}>{lis}</li>)
        });
        return (
            <div className="text-sequence_box">
                <p className="text-sequence_title">{subheader}</p>
                <ul className="text-sequence_ul">{rv}</ul>
            </div>
        )
    }
}

TextSequence.propTypes = propTypes;
TextSequence.defaultProps = defaultProps;

export default TextSequence;