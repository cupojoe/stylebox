'use strict';

import $ from 'jquery';
import SourceMapper from 'source-map';

export default class StylesDisplayBox {  
  constructor() {
    console.log('Styles display box');
    this.cssMap;
    this.css;
    this.cssMapUrl = '/styles/main.css.map';
    this.cssUrl = '/styles/main.css';
    $.ajax(this.cssMapUrl, {success: this.onCSSMapLoad, context: this});
  }
  
  onCSSLoad(data) {
    this.css = data.split('\n');
    $('#StylesDisplayBox #CompiledCSS').html(this.css.slice(this.generatedLineLimits[0].line - 1, this.generatedLineLimits[1].line).join('\n'));
  }
  
  onCSSMapLoad(data) {
    console.log(this);
    
    this.cssMap = data;
    let path = $('#StylesDisplayBox').data('path');
    let index = data.sources.indexOf(path);
    
//    console.log(data);
    console.log(path);    
    let smc = new SourceMapper.SourceMapConsumer(data);
//    console.log(smc.sourceContentFor(path));
//    console.log(smc.generatedPositionFor({
//      source: path, 
//      line: 4, 
//      column: 2
//    }));
//    console.log(smc.originalPositionFor({
//      line: 414,
//      column: 0
//    }));
    this.generatedLineLimits = smc.allGeneratedPositionsFor({
      source: path,
      line: 1
    });
//    smc.eachMapping(function(s) {
//      console.log(s);
//    });
    $.ajax(this.cssUrl, {success: this.onCSSLoad, context: this});
    $('#StylesDisplayBox #PreCSS').html(data.sourcesContent[index]);
  }
}
