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
        this.drawChart(this.props.data.data)
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
       this.setState({
           rows: nextProps.data.rows,
           columns: nextProps.data.columns
       });
        this.drawChart(nextProps.data.data)
    }
    componentDidUpdate(prevProps, prevState) {
      if (this.state.rows !== prevState.rows) {

      }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }
    drawChart(data) {
        if (data.length <= 0) {
            return
        }
        let fm = this.props.formData;
        let timeG = fm.timeGrainSqla
        let timeTag = timeG[timeG.length - 1]
        let formatStr = 'YYYY-MM-DD HH:mm:ss'
        let index = formatStr.lastIndexOf(timeTag)
        formatStr = formatStr.substring(0, index + 1)
        let option = {
        xAxis: {
          type: 'category',
          data: data[0].values.map(item => moment(item.x).format(formatStr))
        },
        yAxis: data.map(item => ({
            name: item.yAxisLabel,
            type: 'value'
        })),
        legend: {
          data: data.map(item => item.yAxisLabel),
          x: 'center'
        },
        series: data.map((item, index) => {
            return {
                name: item.yAxisLabel,
                type: 'line',
                smooth: true,
                data: item.values.map(item => item.y),
                yAxisIndex: index
            }
        }),
        tooltip: {
          trigger: 'axis',
          formatter: "{b} <br/>{a0}：{c0}<br/>{a1}：{c1}"
        }
      };
        console.log(option)
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