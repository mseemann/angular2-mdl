#!/usr/bin/env node
'use strict';

// extract scss files and put them into scss/mdl folder. Run: npm run generate-scss-from-mdl-scss

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ncp = require('ncp').ncp;

const destPath = 'projects/core/src/scss/mdl';
var basePath = process.cwd();
var source = path.resolve(basePath, 'node_modules/material-design-lite/src');
var dest = path.resolve(basePath, destPath);


fs.mkdirSync(destPath);

ncp(source, dest, {
  filter: function (fileName) {
    if (fileName.endsWith('snippets')) {
      return false;
    }
    if (fs.statSync(fileName).isDirectory()) {
      return true;
    }
    return fileName.endsWith('.scss');
  }
}, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});
