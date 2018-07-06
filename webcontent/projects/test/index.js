import React, {
  Component
} from 'react';
import fetchJsonp from 'fetch-jsonp'
require('./demo.css')
import Env from '../../common/Env'
import Tab from '../../common/Tab'
import Toast from '../../common/Toast'
import Modal from '../../common/Modal'
import Swiper from '../../common/Swiper'
import LotteryCircle from '../../common/LotteryCircle'
import Copy from '../../common/Clipboard'
import Page from '../../common/Page'
import login from '../../common/Login';
import ShareWeb from '../../common/ShareWeb';
import Share from '../../common/Share';
import Anchor from '../../common/Anchor';

//ENV
//返回一个对象，对象输出字段如下
//
//browser：浏览器类型 （wx,qq,uc,baidu,360,liebao,opera,sougou,other）
//
//os     ：系统（仅移动端输出）android ios
//
//client ：所处环境是基线，游戏中心，还是浏览器（仅移动端输出）androidGC:安卓游戏中心 iosGC：ios游戏中心 jx：基线 browser：浏览器

class DemoEnv extends Component {
  render() {
    console.log(Env)
    return (
      <div><h2>1,当前环境：</h2> {JSON.stringify(Env)}</div>
    )
  }
}

///tab
class DemoTab extends Component {

  //TAB标签点击回调
  callback(index) {
    alert(index);
  }

  render() {

    const data = [{
      title: 1,
      content: 'aa'
    }, {
      title: 2,
      content: 'bb'
    }, {
      title: 3,
      content: 'cc'
    }];

    return (
      <div>
          <h2>2,TAB切换：</h2>
          <Tab callback={this.callback} defaultActive={1} >
            {
              data.map((item,index) => {
                return (
                    <div title={item.title} key={index}>{item.content}</div>
                )
              })
            }
          </Tab>
        </div>
    )
  }
}

///Toast
//调用方法：
//text:提示文本
//delay:提示停留时间
//Toast(text,delay)
class DemoToast extends Component {

  tt() {
    Toast('test123', 2000)
  }

  render() {
    return (
      <div>
          <h2>3,toast弹窗</h2>
          <button onClick={this.tt}>toast</button>
        </div>
    )
  }
}

///Modal 弹窗
class DemoModal extends React.Component {
  state = {
    visible: 'hidden'
  }

  //显示
  handleShow = () => {
    this.setState({
      visible: 'visible',
    });
  }

  //关闭
  handleClose = () => {
    this.setState({
      visible: 'hidden',
    });
  }

  //确认
  handleOk = (e) => {
    console.log(e);
    alert('OK');
    this.setState({
      visible: 'hidden',
    });
  }

  //取消
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: 'hidden',
    });
  }


  render() {
    return (
      <div>
          <h2>4,Modal弹窗</h2>
          <button onClick={this.handleShow}>Modal</button>

          <Modal
              title="标题"
              visible={this.state.visible}
          >
            <div className="content">
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </div>

            <span className="close" onClick={this.handleClose.bind(this)}>关闭</span>
            <span onClick={this.handleOk.bind(this)}>确认</span>
            <span onClick={this.handleCancel.bind(this)}>取消</span>
          </Modal>
        </div>
    );
  }
}

//Lottery 转盘抽奖
class DemoLottery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      i: 0,
      len: 6, //总共几个奖品
    }
  }

  //请求数据
  getData() {
    //抽奖成功
    this.setState({
      i: this.state.i + 1,
      item: 1
    });
  }

  //转盘回调
  callback() {
    alert('123');
  }

  render() {
    return (
      <div>
          <h2>5,转盘抽奖</h2>
          <LotteryCircle data={this.state} callback={this.callback} getData={this.getData.bind(this)} />
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
      num: 5, //每页的条数
      timeFormat: 1, //1,2018-05-25 2,16:47:14 3,2018-05-25 16:47:14
      getData: this._getData.bind(this)
    }
  }

  componentDidMount() {
    //初始展示第几页
    this._getData(2)
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
    fetchJsonp('https://apisgame.iqiyi.com/website/Brand/Game/pcNewsList?&calllback=?&page=' + index + '&number=' + that.state.num)
      .then(function(response) {

        response.json().then((data) => {
          that.setState({
            news: data.data.news,
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
        <div>
          <h2>7，分页</h2>
          <Page {...this.state}>
            {
              this.state.news.map((item,index) => {
                return(
                    <li key={index}>
                      <a href={'http://iqipai.iqiyi.com/web/newscontent.html?id='+item.id}>
                        <span className="label">{this.state.label[item.cate_id]}</span>
                        <span className="news-title">{item.title}</span>
                        <i className="publish-time">{this.tFormat(item.publish_time,this.state.timeFormat)}</i>
                        <div className="sub-title">{item.sub_title}</div>
                        <div className="news-content">{item.content}</div>
                      </a>
                    </li>
                )
              })
            }
          </Page>
        </div>
    )
  }
}


//H5登录 参数说明
//url  ：必传，登录后的回跳地址
//useWX：可选，在微信中是否使用微信授权微信，这种登录方式只在微信环境中启用
//useNative : 可选，在基线中是否使用native登录
class DemoLogin extends Component {
  render () {
    return (
        <button onClick={()=>{login({
        url:'http://www.baidu.com'
      })}}>登录</button>
    )
  }
}

///分享
// 基线分享需要在页面中引入http://static.iqiyi.com/js/common/iqiyiJsBridge.min.js
// 微信分享需在页面中引入 http://res.wx.qq.com/open/js/jweixin-1.0.0.js
class DemoShare extends Component {

  constructor(){
    super();
    this.state = {
      webShare:false
    }
  }

  //游戏中心分享回调 版本是6.2.0开始生效
  //result的值可能是 success fail cancel / 成功 失败 取消
  onShareCallback(result,channel){

  }
  //基线分享回调
  callback(result){
    alert(result)
  }

  //其它分享方式
  otherShare(){
    //这里可以用来显示出ShareWeb组件
    this.setState({
      webShare:true
    })
  }

  render () {
    const data = {
      title:'分享的标题',
      content:'分享的内容',
      url:'http://www.baidu.com',//分享的链接
      pic:'http://static.g.ppstream.com/images/h5/icon/201603/56d8ff7909712.png',//分享出去的图片
      callback:this.callback,
      otherShare:this.otherShare.bind(this),
      shareMessage:'',//仅分享到qq好友时使用
      wxData:{
        appId:'',
        timestamp:'',
        nonceStr:'',
        signature:''
      }
    }

    return (
        <div>
          <Share {...data} ><button className="share-btn" >分享</button></Share>
          <br/>
          {this.state.webShare
              ? <ShareWeb {...data} />
              : null
          }

        </div>
    )
  }
}

///Anchor
//调用方法：
//Anchor(id)
class DemoAnchor extends Component {

  tt(){
    Toast('test123',2000)
  }

  render () {
    return (
        <div>
          <div className="anchor-list">
            <a href="javascript:;" onClick={()=> Anchor('aa')}>aa</a>
            <a href="javascript:;" onClick={()=> Anchor('top')}>top</a>
          </div>
          <h1 id="aa" style={{height:'500px',background:'#eee'}}>blockAA33</h1>
        </div>
    )
  }
}

///主入口
class App extends Component {

  render() {
    return (
      <div id="top">
          <DemoEnv/>
          <DemoTab/>
          <DemoToast/>
          <DemoModal />
          <DemoLottery />
          <h2>6,复制</h2>
          <Copy />
          <DemoPage />
          <h2>8,登录</h2>
          <DemoLogin />
          <h2>9,分享</h2>
          <DemoShare />
          <DemoAnchor />
        </div>
    )
  }
}

export default App;