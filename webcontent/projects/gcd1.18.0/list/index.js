import React, {
  Component
} from 'react';
import fetchJsonp from 'fetch-jsonp'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Baidu from '../components/Baidu.js'
import Tab from '../../../common/Tab'
import Page from '../../../common/Page'
import './style.css'

class List extends Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    return (
      <div className="list-main">
        <a className="back" href={`${data.hostUrl}/mobile`}></a>
        <p className="list-title">热点新闻</p>
        <ListT/>
      </div>
    )
  }
}

///page分页
class DemoPage extends Component {

  constructor() {
    super();
    this.state = {
      label: {
        '40': '【新闻】',
        '41': '【活动】',
        '42': '【公告】',
        '44': '【功略】'
      },
      news: [],
      maxPage: 0,
      currentPage: 1,
      num: 7, //每页的条数
      timeFormat: 1, //1,2018-05-25 2,16:47:14 3,2018-05-25 16:47:14
      getData: this._getData.bind(this)
    }
  }

  componentDidMount() {
    //初始展示第几页
    this._getData(1)
  }

  //时间格式化
  tFormat(time, f) {
    if (f === 1) {
      return time.split(" ")[0]
    } else if (f === 2) {
      return time.split(" ")[1]
    } else {
      return time
    }
  }

  //取数据
  _getData(index) {
    let that = this;
    fetch(data.hostUrl + '/page/' + this.props.type + '/' + index + '/' + that.state.num)
      .then(function(response) {

        response.json().then((data) => {
          that.setState({
            news: data.data.newsInfo,
            maxPage: data.data.maxPage,
            currentPage: data.data.page
          })
        })
      }).then(function(json) {

      }).catch(function(error) {

      });
  }

  render() {

    return (
      <Page {...this.state}>
          {
            this.state.news && this.state.news.map((item,index) => {
              return(
                  <li key={index}>
                    <a href={`${data.hostUrl}/mobile_news/${item.news_id}.html`}>
                      <span className="news-title">{item.title}</span>
                      <i className="publish-time">{this.tFormat(item.created_at,this.state.timeFormat)}</i>
                    </a>
                  </li>
              )
            })
          }
        </Page>
    )
  }
}

class ListT extends Component {
  constructor() {
    super();
  }
  render() {
    const data_list = [{
      title: '新闻',
      content: <DemoPage type="news"/>
    }, {
      title: '公告',
      content: <DemoPage type="notice"/>
    }, {
      title: '攻略',
      content: <DemoPage type="strategy"/>
    }];
    var default_title = '0';
    if (data.newsInfo.signal == 'notice') {
      default_title = '1'
    }
    if (data.newsInfo.signal == 'strategy') {
      default_title = '2'
    }
    return (
      <Tab callback={this.callback} defaultActive={default_title}>
        {
          data_list.map((item,index) => {
            return (
              <ul title={item.title} key={index}>{item.content}</ul>            
            )
          })
        }
      </Tab>
    )
  }
}


class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <List/>
        <Footer/>
        <Baidu/>
      </div>
    )
  }
}

export default App;