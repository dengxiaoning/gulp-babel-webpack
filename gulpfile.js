const {series, watch,src,dest } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');


function clear(cb){
    del.sync('build');
    cb();
}

function command(cb){
  src('src/**/*.less')
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(cleanCSS())
  .pipe(dest('build'));
  cb();
}

function watchComand(){
 const watcher = watch(['src/**/*'],series(clear,command));
  watcher.on('change',function(path,stats){
    console.log(`File ${path} was changed `)
  })
}


exports.default = series(clear,command,watchComand)
