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
gulp.task('html-watch', buildMethods.html);

// copy image changes
gulp.task('images-watch', buildMethods.images);

// copy font changes
gulp.task('fonts-watch', buildMethods.fonts);

// compile SASS w/ compass (this could be nicer)
gulp.task('compass-watch', buildMethods.compass);

gulp.task('jspm-bundle-watch', buildMethods.jspmBundle);
/* End watch tasks*/

/* Build methods*/
// copy HTML changes
gulp.task('html', buildMethods.html);

// copy image changes
gulp.task('images', ['install'], buildMethods.images);

// copy font changes
gulp.task('fonts', ['install'], buildMethods.fonts);

// compile SASS w/ compass (this could be nicer)
gulp.task('compass', ['install'], buildMethods.compass);

// compile minified SASS w/ compass
gulp.task('compass-min', ['install'], buildMethods.compassMin);

// bundle jspm
gulp.task('jspm-bundle', ['install'], buildMethods.jspmBundle);

// bundle minified jspm
gulp.task('jspm-bundle-min', ['install'], buildMethods.jspmBundleMin);

gulp.task('clean', buildMethods.clean);

gulp.task('install', ['clean'], buildMethods.install);

gulp.task('version', ['html'], buildMethods.version);


// build dist
gulp.task('default', function() {
  run(
    ['compass', 'fonts', 'images', 'jspm-bundle'],
    'version',
    'exit'
  );
});

// develop a locally-hosted build
gulp.task('host', ['watch', 'connect']);

// build dist for production
gulp.task('package', function() {
  run(
    'clean',
    ['images', 'fonts', 'compass-min', 'jspm-bundle-min'],
    'version',
    'exit'
  );
});
