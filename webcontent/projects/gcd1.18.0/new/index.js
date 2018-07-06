import React, {
  Component
} from 'react';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Share from '../components/Share.js'
import Baidu from '../components/Baidu.js'
import './style.css'

class Content extends Component {

  shareclick(obj) {
    Share(obj)
  }
  render() {
    const obj = {
      shareTitle: data.news.title,
      shareContent: '正版鬼吹灯，正宗摸金范！',
      shareUrl: location.href,
      sharePic: `${require("../img/share.jpg")}`
    }
    var cate_name = 'news';
    if (data.news.cate_id == '42') {
      cate_name = 'notice'
    }
    if (data.news.cate_id == '44') {
      cate_name = 'strategy'
    }
    return (
      <div className="new-main">
        <a className="back" href={`${data.hostUrl}/mobile_nlist/${cate_name}`}></a>
        <div className="share">
            <span>分享到：</span>
            <a className="weibo-share" onClick={()=>this.shareclick(obj)}></a>
        </div>
        <div className="box-new">
            <div className="new-title">
                <h3 dangerouslySetInnerHTML={{__html:data.news.title}}></h3>
                <span>{data.news.created_at}</span>
                <p className="title-border"></p>
            </div>
            <div className="new-inner">
                <div dangerouslySetInnerHTML={{__html:data.news.content}} />
                <div className="next-new">
                  {
                     data.prev_one == null ? (
                          null
                      ) : (
                          <span ><a href={`${data.hostUrl}/mobile_news/${data.prev_one.news_id}.html`} className="p-new"></a></span>
                      )
                  }
                  {
                     data.next_one == null ? (
                          null
                      ) : (
                          <span ><a href={`${data.hostUrl}/mobile_news/${data.next_one.news_id}.html`} className="n-new"></a></span>
                      )
                  }   
                </div>
            </div>
        </div>
      </div>
    )
  }
}

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Content/>
        <Footer/>
        <Baidu/>
      </div>
    )
  }
}

export default App;