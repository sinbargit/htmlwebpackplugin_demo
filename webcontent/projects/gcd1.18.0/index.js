import React, {
  Component
} from 'react';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Baidu from './components/Baidu.js'
import Tab from '../../common/Tab'
import Modal from '../../common/Modal'
import Track from '../../common/track'
import BaseComponet from '../../components/basecomponent'
import moment from 'moment'
import './style.css'

class ListTab extends Component {
  constructor() {
    super();
    this.list = [
        data.news,
        data.notice,
        data.strategy
      ],
      this.listtitle = [
        <img src={require('./img/n-1.png')}/>,
        <img src={require('./img/n-2.png')}/>,
        <img src={require('./img/n-3.png')}/>
      ]
  }

  ///
  newhref(id) {
    return `${data.hostUrl}/mobile_news/${id}.html`;
  }
  listhref(id) {
    return `${data.hostUrl}/mobile_nlist/${id}`;
  }
  listcontent(list) {
    if (!list) {
      return []
    }
    var result = [];
    list.forEach((p, index) => {
      var item = <li key={index}><a dangerouslySetInnerHTML={{__html:p.title}} href={this.newhref(p.news_id)}></a><i>{p.created_at}</i></li>;
      result.push(item);
    });
    return result;
  }

  ///
  render() {
    const data_list = [{
      title: this.listtitle[0],
      content: this.listcontent(this.list[0]),
      list_href: 'news'
    }, {
      title: this.listtitle[1],
      content: this.listcontent(this.list[1]),
      list_href: 'notice'
    }, {
      title: this.listtitle[2],
      content: this.listcontent(this.list[2]),
      list_href: 'strategy'
    }];
    return (
      <Tab>
          {
            data_list.map((item,index) => {
              return (
                <ul title={item.title} key={index}>{item.content}<li className="more-btn"><a href={this.listhref(item.list_href)}>查看更多></a></li></ul>
              )
            })
          }
        </Tab>
    )
  }
}

///
class Content extends Component {
  render() {
    return (
      <div className="main">
      <ListTab/>
      </div>
    )
  }
}

///
const bg_01 = {
  width: '100%',
  background: `url(${require("./img/bg_01.jpg")})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% auto'
};
const bg_02 = {
  width: '100%',
  background: `url(${require("./img/bg_02.jpg")})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% auto'
};
class Background extends Component {
  render() {
    return (
      <div className="bg">
        <div className="bg_01" style ={ bg_01 }></div>
        <div className="bg_02" style ={ bg_02 }></div>
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
      visible: 'visible'
    });
    document.getElementById('video-con').innerHTML = '<video id="video1" width="100%" height="auto" loop="true" controls><source src=' + `${
      data.common[0].h5_video_play
    }` + ' type="video/mp4"></source></video>';
    document.getElementById('video1').play();
  }

  //关闭
  handleClose = () => {
    this.setState({
      visible: 'hidden',
      video_link: ''
    });
    document.getElementById('video1').pause();
    document.getElementById('video-con').innerHTML = '';
  }

  render() {
    return (
      <div>
        <div className="video-con">
          <span className="video-btn" onClick={this.handleShow}></span>
          <ul className="video-link">
              <li><a href="http://www.iqiyi.com/v_19rr80lv9c.html"></a></li>                                                                                                                                                                                                          
              <li><a href="http://www.iqiyi.com/v_19rr80pfz8.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr80pf8c.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr80phzc.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr7woduw.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr7ww33w.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr7iyfow.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr7iyc0o.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr7nmja8.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr7nm4q8.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr8dxpc4.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr8dxigw.html"></a></li>
              <li><a href="http://www.iqiyi.com/v_19rr8ketuo.html"></a></li>
              <li className="video-more-btn"><a href="http://www.iqiyi.com/lib/m_211070614.html?src=search"></a></li>
          </ul>
        </div>

        <Modal
          title="标题"
          visible={this.state.visible}
        >
          <div id="video-con">
          </div>

          <span className="close" onClick={this.handleClose.bind(this)}>关闭</span>
        </Modal>
      </div>
    );
  }
}

///
const fla_bg = {
  width: '100%',
  background: `url(${require("./img/bottom.png")})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% auto'
};
///投递
class Delivery extends BaseComponet {
  constructor() {
    super();
    let pageData = {
      isWebsite: true,
      IP: returnCitySN["cip"],
      rpage: 'homepage',
      html_id: '994',
      html_name: 'gcdh5'
    }

    Track.init(pageData)
  }
  clickTrack = (e) => {
    var node = e.target
    while (node !== document.body) {
      const track = JSON.parse(node.getAttribute('data-track'))
      if (track) {
        Track.click(track)

        break
      }
      node = node.parentNode
    }
  }
  render() {
    return (
      <div className="fla_bg" style={fla_bg}>
        <a href="http://nt.game.iqiyi.com/index.php?cf=1528858305&qd=222&orientation=2" className="download-wd" onClick={this.clickTrack} data-track={JSON.stringify({block:'gamestart'})}>开始游戏</a>
        <a href={data.common[0].discuss} className="game-lt" onClick={this.clickTrack} data-track={JSON.stringify({block:'forum'})}>游戏论坛</a>
      </div>
    )
  }

}

///
class App extends Component {
  render() {
    return (
      <div>
        <Background/>
        <Header/>
        <Content/>
        <Footer/>
        <DemoModal/>
        <Baidu/>
        <Delivery/>
      </div>
    )
  }
}

///
export default App;