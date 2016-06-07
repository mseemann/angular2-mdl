#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ncp = require('ncp').ncp;

var basePath = process.cwd();
var source = path.resolve(basePath, 'node_modules/material-design-lite/src');
var dest = path.resolve(basePath, 'src/scss/mdl');


fs.mkdirSync(path.join('src/scss','mdl'));

ncp(source, dest, {filter: function(fileName){
  if(fileName.endsWith('snippets')){
    return false;
  }
  if(fs.statSync(fileName).isDirectory()){
    return true;
  }
  return fileName.endsWith('.scss') || fileName.endsWith('.svg');
}}, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});

