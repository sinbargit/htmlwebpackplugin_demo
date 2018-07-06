import React, {Component} from 'react';
import './index.css';
import Toast from '../../common/Toast';
import '../../common/toast.css';
import env_info from '../../common/Env.js';
import {schemaFunc,GetQueryString} from './common';
import MySwiper from './MySwiper/MySwiper';
import header_jpg from './assets/header.jpg';
import footer_jpg from './assets/footer.jpg';
import mask_png from './assets/mask.png';
import Track from '../../common/track';
import {getCookieByName} from '../../common/utils';

class Mask extends Component {
  constructor (props) {
    super(props);
    this.handleMaskClick = this.handleMaskClick.bind(this);
  }
  handleMaskClick (e) {
    this.refs.maskHook.style.display = 'none';
  }
  render () {
    return (
      <div className="mask" ref="maskHook" onClick={this.handleMaskClick}><img src={mask_png} alt="" /></div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pageNumber: data.common.length
    }
    this.handleClick = this.handleClick.bind(this);
    const pageData=
      {
        isWebsite : true,
        uid: getCookieByName('user_id'),
        IP: returnCitySN["cip"],
        entry_source: GetQueryString('source'),
        html_name: data.html[0].html_name,
        html_id: 'game_vip_rights'
      }
    Track.init(pageData);
  }

  componentDidMount () {
    if (/android/.test(navigator.userAgent.toLowerCase())) {
      if (GetQueryString('button') && GetQueryString('button') === 'hidden') {
        document.querySelector('footer').style.display = 'none';
      } else {
        document.querySelector('footer').style.display = 'block';
      }
    }
  }

  handleClick (e) {
    e.preventDefault();
    var node = e.target;
    while (node !== document.body) {
      const track = JSON.parse(node.getAttribute('data-track'));
      if (track) {
        Track.click(track);
        break;
      }
      node = node.parentNode;
    }
    let url = '{"biz_params":{"biz_sub_id":"23","biz_extend_params":"","biz_statistics":"block=H5_vip_gift"}}',
      ios_url = '{"biz_plugin":"com.qiyi.gamecenter","biz_id":"5","biz_params":{"biz_sub_id":"23","biz_extend_params":"","biz_statistics":"block=H5_vip_gift"}}';
    if (env_info.os === 'android') {
      window.location.href = schemaFunc(url);
    } else {
      window.location.href = schemaFunc(ios_url);
    }
    if (env_info.browser === 'wx') {
      this.refs.maskNode.refs.maskHook.style.display = 'block';
    } else {
      setTimeout(function () {
        Toast('请安装爱奇艺APP', 3000);
      }, 3000);
    }
  }
  render () {
    return (
      <div className="app">
        <header className="app-header"><img src={header_jpg} alt=""/></header>
        <MySwiper number={this.state.pageNumber}></MySwiper>
        <footer className="app-footer" onClick={this.handleClick} data-track={JSON.stringify({block:1,num:1})}><img src={footer_jpg} alt=""/></footer>
        <Mask ref="maskNode" />
      </div>
    );
  }
}

export default App;