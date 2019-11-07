import React from 'react';
import PropTypes from 'prop-types';
import Mustache from 'mustache';
import moment from 'moment';
import '../../utils/jquery.SuperSlide.2.1.3.source'
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

class ScrollList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.data.rows,
            columns: props.data.columns
        }
    }
    componentDidMount() {
        console.log(this.refs.scrollList)
        this.updateDom()
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
       this.setState({
           rows: nextProps.data.rows,
           columns: nextProps.data.columns
       })
        this.updateDom()
    }
    componentDidUpdate(prevProps, prevState) {
      if (this.state.rows !== prevState.rows) {
          let rect = this.refs.scrollList.getBoundingClientRect()
      }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }
    updateDom() {
        const formater = this.props.formatter;
        const data = this.props.data;
        const list = [];
        data.rows.forEach(function(row, i) {
            const para = data.columns.reduce(function (prev, cur, index) {
              prev[cur] = row[index];
              return prev
            }, {$index: i, $no: i + 1});
            let str = Mustache.render(formater, para);
            list.push(`<li class="scroll-list__item">${str}</li>`)
        });
        let dom = $(`<ul ref="scrollList" class="scroll-list">${list.join('')}</ul>`);
        $(this.refs.scrollList).html('').append(dom);
            if (this.refs.scrollList.getBoundingClientRect().height < this.props.height) {
                $(this.refs.scrollList).slide({mainCell:".scroll-list",autoPlay:true,effect:"topMarquee",vis:3,interTime:50,trigger:"click"});
            }
    }

  render() {
      return <div ref="scrollList" className="scroll-list__container"></div>
  }
}

ScrollList.propTypes = propTypes;
ScrollList.defaultProps = defaultProps;

export default ScrollList;