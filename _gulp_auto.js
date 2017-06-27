'use strict';
var path = require('path');
var gulp = require('gulp');
var fs = require('fs-extra');
// html压缩
var htmlmin = require('gulp-htmlmin');
// JS混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// css压缩
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
var sass = require("gulp-sass");

// 本次测试同步服务器
var ms = require('browser-sync').create();

function Run() {
  // html的信息收集
  this.infos = {}

  // JS文件信息的收集器
  this.JS_infos = {}

  // css信息收集器
  this.css_infos = {}
}
Run.prototype = {
  init: function(opts) {
    var me = this;
    me.opts = opts;

    // ----清除文件
    me._clean();
    // 读取HTML下的文件
    me._read_html();
    me._read_js();
    me._read_css();
    // --------------------可以向外暴露的方法
    me._gulp_html();
    me._gulp_js();
    me._copy();
    me._gulp_css();
  },
  // ---------------------------------------------clean
  _clean:function () {
    var me = this;
    fs.removeSync(path.join('./', me.opts.dist));
    console.log('1');
  },
  // ---------------------------------------------html
  _read_html: function() {
    var me = this;
    var o = me.opts;
    var html_path = path.join('./', o.src, o.min_html);

    var files = fs.readdirSync(html_path);
    me._handle_files(files, html_path);
    // console.log(me.infos);
    // me._gulp_html();
  },
  // ---------------------------------------------copy
  _copy: function() {
    var me = this;
    var arr = me.opts.copy;
    for (var i = 0; i < arr.length; i++) {
      var src = path.join(me.opts.src, arr[i]);
      var dist = path.join(me.opts.dist, arr[i]);
      fs.copySync(src, dist);
    }
  },
  // ---------------------------------------------min_js
  // 读取src 文件夹下面js
  _read_js: function() {
    var me = this;
    var o = me.opts;
    var js_path = path.join('./', o.src, o.min_js);
    var files = fs.readdirSync(js_path);

    me._handle_files(files, js_path);

    // var name = path.basename(me.opts.min_js);
    // gulp.src(path.join(me.opts.src, root_path, '/**/*.js'))
    //   .pipe(concat(name))
    //   .pipe(uglify())
    //   .pipe(gulp.dest(path.join(me.opts.dist, root_path)));
  },
  // ---------------------------------------------css
  _read_css: function() {
    var me = this;
    var me = this;
    var o = me.opts;
    var css_path = path.join('./', o.src, o.min_css);
    var files = fs.readdirSync(css_path);

    me._handle_files(files, css_path);
  },
  // --------------------------------------------------------基础函数
  // ---------------------------------------------server
  _handle_files: function(files, _path) {
    var me = this;
    var arr = files;
    var extname = null;
    for (var i = 0; i < arr.length; i++) {
      extname = path.extname(arr[i]);
      // ------------------------文件夹
      if (extname == '') {
        me._is_dir(arr[i], _path);
      }
      // ------------------------html文件
      else if (extname == '.html') {
        me._is_file(me.infos, arr[i], _path);
      }
      // ------------------------JS文件
      else if (extname == '.js') {
        me._is_file(me.JS_infos, arr[i], _path);
      }
      // ------------------------JS文件
      else if (extname == '.css' || extname == '.less' || extname == '.scss') {
        me._is_file(me.css_infos, arr[i], _path);
      }
    }
  },
  // ---------------------------------------dir
  _is_dir: function(name, _path) {
    var me = this;
    var dir_path = path.join(_path, name);
    var files = fs.readdirSync(dir_path);
    me._handle_files(files, dir_path);
  },
  // -----------------------------------------file
  _is_file: function(obj, name, _path) {
    var me = this;
    var _src_path = path.join('./', _path, name);

    var arr = _path.split(path.sep);
    // arr.shift().unshift(me.opts.dist);
    arr[0] = me.opts.dist;
    var _dist_path = path.join('./', arr.join(path.sep));

    obj[name] = {
      src: _src_path,
      dist: _dist_path
    };
  },
  // --------------------------------------------------------gulp
  // ----------------------------------------min_HTML
  _gulp_html: function() {
    var me = this;
    var obj = me.infos;
    for (var k in obj) {
      gulp.src(obj[k].src)
        .pipe(htmlmin({
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        }))
        .pipe(gulp.dest(obj[k].dist));
    }
  },
  // ----------------------------------------min_JS
  _gulp_js: function() {
    var me = this;
    var obj = me.JS_infos;
    for (var k in obj) {
      gulp.src(obj[k].src)
        .pipe(uglify())
        .pipe(gulp.dest(obj[k].dist));
    }
  },
  // ----------------------------------------min_css
  _gulp_css: function() {
    var me = this;
    var obj = me.css_infos;
    for (var k in obj) {
      me._k_val(k, obj[k]);
    }
  },
  // 每一项的处理
  _k_val: function(key, val) {
    var me = this;
    // -------css的处理
    if (key.indexOf('.css') >= 0) {
      gulp.src(val.src)
        .pipe(cssnano())
        .pipe(gulp.dest(val.dist));
    }
    // -------less的处理
    else if ((key.indexOf('.less') >= 0) && (key.indexOf('_') == -1)) {
      gulp.src(val.src)
        // less转换
        .pipe(less({
          paths: [path.join(__dirname, 'less', 'includes')]
        }))
        // css压缩
        .pipe(cssnano())
        .pipe(gulp.dest(val.dist));
    }
    // -------scss的处理
    else if ((key.indexOf('.scss') >= 0) && (key.indexOf('_') == -1)) {
      gulp.src(val.src)
      .pipe(sass())
      .pipe(gulp.dest(val.dist));
    }
  }
};

module.exports = new Run();
