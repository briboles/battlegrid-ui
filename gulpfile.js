'use strict';

var fs = require('fs');
var gulp = require('gulp');
var shell = require('gulp-shell');
var compass = require('gulp-compass');
var rimraf = require('rimraf');
var run = require('run-sequence');

var buildMethods = {
  html:function() {
    return gulp.src('./lib/html/**/*')
      .pipe(gulp.dest('./dist'));
  },
  images:function() {
      return gulp.src('./lib/images/**/*')
        .pipe(gulp.dest('./dist/images'));
  },
  fonts:function() {
    return gulp.src('./lib/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'));
  },
  compass:function() {
    return gulp.src('./lib/scss/**/*.scss')
      .pipe(compass({
        sass: './lib/scss',
        css: './dist/css'
      }));
  },
  compassMin:function() {
    return gulp.src('./lib/scss/**/*.scss')
      .pipe(compass({
        sass: './lib/scss',
        css: './dist/css',
        style: 'compressed'
      }));
  },
  jspmBundle:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm bundle-sfx index dist/js/index.js'
      ]));
  },
  jspmBundleMin:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm bundle-sfx index dist/js/index.js --minify'
      ]));
  },
  clean:function(cb) {
    rimraf('./dist', function(err){
      if(err) return cb(err);
      rimraf('./.sass-cache', cb);
    });
  },
  install:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm install'
      ]));
  },
  version:function(cb) {
    fs.writeFile('dist/version.html', require('./package.json').version, cb);
  }
};

gulp.task('exit', function() {
  console.log('Tasks complete, exiting ...');
  process.exit(0);
});

/* Ability to watch without clean and install */
// copy HTML changes
gulp.task('html-watch', function() {
  return gulp.watch(['lib/html/**/*.html'], ['html'])
    .on('change', function(event) {
      console.log('Change Detected in '+ event.path);
    })
});

gulp.task('jspm-bundle-watch', function() {
  return gulp.watch(['lib/js/**/*.js'], ['jspm-bundle'])
    .on('change', function(event) {
      console.log('Change Detected in '+ event.path);
    })
});
/* End watch tasks*/

/* Build methods*/
// copy HTML changes
gulp.task('html', buildMethods.html);

// bundle jspm
gulp.task('jspm-bundle', buildMethods.jspmBundle);

// bundle minified jspm
gulp.task('jspm-bundle-min', buildMethods.jspmBundleMin);

gulp.task('clean', buildMethods.clean);

gulp.task('install', ['clean'], buildMethods.install);

gulp.task('version', ['html'], buildMethods.version);


// build dist
gulp.task('default', function() {
  run(
    'install',
    ['images', 'jspm-bundle'],
    'version',
    'exit'
  );
});

gulp.task('watch', ['html-watch','jspm-bundle-watch']);

// build dist for production
gulp.task('package', function() {
  run(
    'clean',
    ['images', 'jspm-bundle-min'],
    'version',
    'exit'
  );
});
