import React,{Component} from 'react'
import './lotteryCircle.css'
 
class Lottery extends Component{

    static defaultProps = {
        i: 0,
        item: 0,
        len:6,
        getData:function(){

        },
        callback:function(){

        },
        data:{}
      }

    constructor(props){
        super(props);
        this.state = {
            start : false
        }
    }
    handleLottery(){
        if(this.state.start){
              return; 
        }

        this.setState({start:true});

        this.props.getData();

        setTimeout(()=> {
          this.setState({
            start:false
          });
          //回调
          this.props.callback()
          
        },3000);

    }
    render() {
        const { i, item, len } = this.props.data;
        return (
            <section className="lottery-wrap">
                <div className="lottery-box" style={{transform:'rotate('+(i * 1800-item*360/len)+'deg)'}}></div>
                <a className="lottery-btn" onClick={this.handleLottery.bind(this)}>抽奖</a>     
            </section>
        )
    }
}
export default Lottery;