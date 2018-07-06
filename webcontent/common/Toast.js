//调用方法Toast(text,time)
import './toast.css'

const element = document.createElement('div');
	  element.className="toast-wrap";
	  document.body.appendChild(element);

const child = document.createElement('div');
	  child.className="toast";	  
	  element.appendChild(child);

function Toast(text,time)	  {
	 element.className="toast-wrap toast-ani";
	child.innerHTML = text;
	setTimeout(function(){
		element.className="toast-wrap";
	},time);
}

export default Toast;