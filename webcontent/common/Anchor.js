import React, { Component } from 'react';

function scrollToAnchor(anchorName){
	    if (anchorName) {
	        let anchorElement = document.getElementById(anchorName);
	        if(anchorElement) {anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});}
	    }
	}

export default scrollToAnchor;