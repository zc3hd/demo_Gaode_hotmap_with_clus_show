/*
本人配合项目目录结构完成的自动开发工具
master分支--开发的是把指定目录下的JS合并压缩为一个JS文件。

现在在dev分支上--把指定目录下的JS，按照原有的路径的进行分别压缩。
*/
'use strict';
// var gulp = require('gulp');

// var fs = require('fs-extra');
var ms = require('browser-sync').create();
var gulp = require('gulp');
var path = require('path');

var run = require('./_gulp_auto.js');
var opts = {
  // 要dist的文件夹名字
  dist: '_dist_webapp',
  // 要src的文件夹名字
  src: 'webapp',
  // 要压缩的HTML根目录名
  min_html: '/html',
  // 要压缩的JS根目录名 及 压缩后的文件名
  // min_js: '/script/module/map/dist_map_moniter.js',
  min_js: '/script/module',
  // 压缩css--css下面可以是css--less--sass
  min_css: '/css',
  // 需要copy的文件夹根目录
  copy: ['/images', '/script/common', '/script/lib'],
};

// run.init(opts);
gulp.task('default', () => {
  // run.init(opts);
  ms.init({
    notify: false,
    server: path.resolve(__dirname, opts.src),
    index: './html/map/index.html',
    port: 1234,
    // tunnel: "myprivatesitecccccccccccc",
    logConnections: true
  });
});

gulp.watch('./' + opts.src + '/**/*')
  .on('change', function(event) {
    // run.init(opts);
    ms.reload();
  });



// =----------------------------------------------------------下面为未整理前，也可用。
// 生成的文件夹根目录的文件名
// var dist_name = '_dist_webapp';
// var src_name = 'webapp';

// var dirname = path.resolve(__dirname, dist_name);


// var tasks = [];

// // ----------------------------------最小化html
// var htmlmin = require('gulp-htmlmin');
// gulp.task('htmlmin', function() {
//   var html_src_path = path.join('./', src_name, '/html/map/map_main_moniter.html');
//   var html_dist_path = path.join('./', dist_name, '/html/map/');
//   gulp.src(html_src_path)
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//       collapseBooleanAttributes: true,
//       removeAttributeQuotes: true,
//       removeComments: true,
//       removeEmptyAttributes: true,
//       removeScriptTypeAttributes: true,
//       removeStyleLinkTypeAttributes: true,
//     }))
//     .pipe(gulp.dest(html_dist_path));
// });
// tasks.push('htmlmin');

// // -----------------------------------复制文件

// var move_files = ['/images', '/script/common', '/script/lib'];
// gulp.task('move_file', function() {
//   for (var i = 0; i < move_files.length; i++) {
//     var copysrc = path.join('./', src_name, move_files[i]);
//     var copydist = path.join('./', dist_name, move_files[i]);
//      // fs.copySync(copysrc, copydist);
//      fs.copy(copysrc, copydist);
//   }
// });
// tasks.push('move_file');


// // -------------------------------------压缩JS
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');

// var js_path = '/script/module/map'
// var dist_js_name = 'dist_map_moniter.js'
// gulp.task('minJS', function() {
//   var js_src = path.join('./', src_name, js_path, '*.js')
//   var js_dist = path.join('./', dist_name, js_path)

//   gulp.src(js_src)
//     .pipe(concat(dist_js_name))
//     .pipe(uglify())
//     .pipe(gulp.dest(js_dist));
// });
// tasks.push('minJS');

// // --------------------------------------注册服务器
// gulp.task('default', tasks, () => {
//   ms.init({
//     notify: false,
//     server: dirname,
//     index: './html/map/map_main_moniter.html',
//     port: 1234,
//     // tunnel: "myprivatesitecccccccccccc",
//     logConnections: true
//   });

//   // gulp.watch('./src/index.html', ['html']);
//   // gulp.watch('./src/styles/base.css', ['style']);
//   // gulp.watch('./src/JS/*.js', ['js']);
// });

// var new_tasks = tasks;
// gulp.task('reload', () => {
//   ms.reload();
// });
// new_tasks.push('reload')
// var watcher = gulp.watch('./' + src_name + '/**/*', new_tasks);
// watcher.on('change', function(event) {
//   console.log('文件 ' + event.path + ' ----------- ' + event.type );
//   // console.log('reload');
// });







// const cssnano = require('gulp-cssnano');
// gulp.task('style', () => {
//   gulp.src('./src/styles/base.css')
//     .pipe(cssnano())
//     .pipe(gulp.dest('./dist/css'));
//   browsersync.reload();
// });



// gulp.task('img', () => {
//   gulp.src('./src/images/*.*')
//     .pipe(gulp.dest('./dist/images'));
//   browsersync.reload();
// });
