import React from 'react';
import PropTypes from 'prop-types';
import Mustache from 'mustache';
import moment from 'moment';
import './EchartLine.css';
const Echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')

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

class EchartLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.data.rows,
            columns: props.data.columns
        }
    }
    componentDidMount() {
        this.echart = Echarts.init(this.refs.chartMain, 'light');
        this.drawChart([])
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
       this.setState({
           rows: nextProps.data.rows,
           columns: nextProps.data.columns
       })
        this.drawChart([])
    }
    componentDidUpdate(prevProps, prevState) {
      if (this.state.rows !== prevState.rows) {

      }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }
    drawChart(data) {
        let option = {
        xAxis: {
          type: 'category',
          data: data.map(item => item.time)
        },
        yAxis: [
          {
            name: '总报警数',
            type: 'value'
          },
          {
            name: '总报警数/小时',
            type: 'value'
          }
        ],
        legend: {
          data: ['总报警数', '报警数/小时'],
          x: 'center'
        },
        series: [
          {
            name: '总报警数',
            data: data.map(item => item.alarmCount),
            type: 'line',
            smooth: true
          },
          {
            name: '报警数/小时',
            data: data.map(item => item.alarmCountPerHour),
            type: 'line',
            smooth: true,
            yAxisIndex: 1
          }
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        tooltip: {
          trigger: 'axis',
          formatter: "{b} <br/>{a0}：{c0}<br/>{a1}：{c1}"
        }
      };
      this.echart.setOption(option, true)
    }

  render() {
        const width = this.props.width;
      const height = this.props.height;
      return <div ref="chartMain" className="echart-line__container" style={{ width: width + 'px', height: height + 'px' }}></div>
  }
}

EchartLine.propTypes = propTypes;
EchartLine.defaultProps = defaultProps;

export default EchartLine;