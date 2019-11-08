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
        const _this = this
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
        let maxCount = 0, tmpHeight=0;
        dom.find('.scroll-list__item').each(function (index, item) {
            // 计算每页最多显示条数
            tmpHeight += $(item).outerHeight(true);
            maxCount++;
            if (tmpHeight >= _this.props.height) {
                return false
            }
        })
        if (this.refs.scrollList.getBoundingClientRect().height > this.props.height) {
            switch (this.props.scrollType) {
                case 'topMarquee':
                    $(this.refs.scrollList).slide({mainCell:".scroll-list",autoPlay:true, effect:"topMarquee", vis:maxCount, interTime:30,trigger:"click"});
                    break;
                case 'top':
                    $(this.refs.scrollList).slide({mainCell:".scroll-list",autoPlay:true, effect:"top", delayTime: 500, pnLoop: true, autoPage:true, scroll: maxCount, vis:maxCount, trigger:"click"});
                    break;
                default:break;
            }

        }
    }

  render() {
      return <div ref="scrollList" className="scroll-list__container"></div>
  }
}

ScrollList.propTypes = propTypes;
ScrollList.defaultProps = defaultProps;

export default ScrollList;