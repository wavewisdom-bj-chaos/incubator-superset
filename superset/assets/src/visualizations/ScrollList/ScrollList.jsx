import React from 'react';
import PropTypes from 'prop-types';
import Mustache from 'mustache';
import moment from 'moment';

import './ScrollList.css';

const propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  data: PropTypes.shape({
    rows: PropTypes.array,
    columns: PropTypes.array
  }),
};

const defaultProps = {
    width: 500,
    height: 500,
    data: {
        columns: [],
        rows: []
    }
};

class ScrollList extends React.PureComponent {
    componentDidMount() {
        console.log('mounted mmmmmmmmmmmmm')
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
       console.log('receive props', nextProps)
    }
  render() {
      const formater = this.props.formatter;
      const data = this.props.data;
      const rv = [];
      data.rows.forEach(function(row, i) {
          const para = data.columns.reduce(function (prev, cur, index) {
              prev[cur] = row[index]
              return prev
          }, {$index: i, $no: i + 1});
          let str = Mustache.render(formater, para)
          rv.push(<li className="scroll-list__item" key={i}>{str}</li>)
      });
      return <ul className="scroll-list">{rv}</ul>
  }
}

ScrollList.propTypes = propTypes;
ScrollList.defaultProps = defaultProps;

export default ScrollList;