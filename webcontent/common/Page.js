import React, { Component } from 'react';
import './page.css'

class Page extends Component {

  //翻页点击
  turnPage(index,currentPage){
    if(index+1 === currentPage){
      return;
    }
    this.getData(index+1)
  }

  //上一页
  prePage(currentPage){
    this.getData(currentPage-1)
  }

  //下一页
  nextPage(currentPage){
    this.getData(currentPage+1)
  }

  curPage(index,currentPage){
    return index+1 === currentPage ? 'on' : null;
  }

  //隐藏上一页下一页
  hidePage(str,currentPage,maxPage){
    if(str === 'pre'){
      return 1 === currentPage ? 'hidePage' : null;
    }else{
      return maxPage=== currentPage ? 'hidePage' : null;
    }
  }

  render(){
    const {maxPage,currentPage,getData} = this.props;

    this.getData = getData;
    //分页
    var pagination=[];

    pagination.push(<span key={'a1'} className={this.hidePage('pre',currentPage,maxPage)} onClick={this.prePage.bind(this,currentPage)}>上一页</span>)

    for(let i=0; i<maxPage; i++){
      pagination.push(<span key={i} className={this.curPage(i,currentPage)} onClick={this.turnPage.bind(this,i,currentPage)}>{i+1}</span>)
    }

    pagination.push(<span key={'a2'} className={this.hidePage('next',currentPage,maxPage)} onClick={this.nextPage.bind(this,currentPage)}>下一页</span>)

    ///
    return(
        <div className="news-list">
          <ul>
            {this.props.children}
          </ul>

          <div className="pagination">
            {pagination}
          </div>
        </div>
    )
  }
}

export default Page;