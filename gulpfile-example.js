'use strict';

var util = require('util'),
    log = require('gulp-util').log,
    fs = require('fs'),
    gulp = require('gulp'),
    shell = require('gulp-shell'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    run = require('run-sequence'),
    rimraf = require('rimraf'),
    revision = require('git-rev');

var buildMethods = {
  html:function() {
    return gulp.src('./lib/html/**/*')
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
  },
  images:function() {
      return gulp.src('./lib/images/**/*')
        .pipe(gulp.dest('./dist/images'))
        .pipe(connect.reload());
  },
  fonts:function() {
    return gulp.src('./lib/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'))
      .pipe(connect.reload());
  },
  compass:function() {
    return gulp.src('./lib/scss/**/*.scss')
      .pipe(compass({
        sass: './lib/scss',
        css: './dist/css'
      }))
      .pipe(connect.reload());
  },
  compassMin:function() {
    return gulp.src('./lib/scss/**/*.scss')
      .pipe(compass({
        sass: './lib/scss',
        css: './dist/css',
        style: 'compressed'
      }))
      .pipe(connect.reload());
  },
  jspmBundle:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm bundle-sfx index dist/js/index.js'
      ]))
      .pipe(connect.reload());
  },
  jspmBundleMin:function() {
    return gulp.src('')
      .pipe(shell([
        'jspm bundle-sfx index dist/js/index.js --minify'
      ]))
      .pipe(connect.reload());
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
    revision.long(function(rev){
      var versionInfo = util.format('%s || %s', require('./package.json').version, rev);
      fs.writeFile('dist/version.html', versionInfo, cb);
    });
  }
};
// livereload server
gulp.task('connect', function() {
  return connect.server({
    root: 'dist',
    livereload: false,
    port: 5003
  });
});

gulp.task('exit', function() {
  log('Tasks complete, exiting ...');
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

// `gulp watch` to develop a remotely-hosted build
gulp.task('watch', function() {
  run(
    'clean',
    ['images', 'fonts', 'compass', 'jspm-bundle', 'version']
  );
  gulp.watch('./lib/html/**/*', ['html-watch']);
  gulp.watch('./lib/images/**/*', ['images-watch']);
  gulp.watch('./lib/fonts/**/*', ['fonts-watch']);
  gulp.watch('./lib/scss/**/*.scss', ['compass-watch']);
  gulp.watch(['index.js', './lib/js/**/*.js'], ['jspm-bundle-watch']);
});

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
