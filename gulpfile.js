var gulp = require('gulp');
var webpack = require('webpack-stream');
var $ = require('gulp-load-plugins')();

gulp.task('default', function() {
    return gulp.src('src/index.js')
      .pipe(webpack(require('./webpack.config.js') ))
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('images', function () {
    return gulp.src('src/images/*.{jpg,png}')
      .pipe($.responsive({
        // Convert all images to JPEG format
        '*': [{
          // image-medium.jpg is 375 pixels wide
          width: 375,
          rename: {
            suffix: '-medium',
            extname: '.jpg',
          },
        }, {
          // image-large.jpg is 480 pixels wide
          width: 480,
          rename: {
            suffix: '-large',
            extname: '.jpg',
          },
        }, {
          // image-extralarge.jpg is 768 pixels wide
          width: 768,
          rename: {
            suffix: '-extralarge',
            extname: '.jpg',
          },
        }],
      }))
      .pipe(gulp.dest('dist'));
  });