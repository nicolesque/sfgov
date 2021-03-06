// Include gulp.
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
var config = require('./config.json');

// Include plugins.
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var glob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');

// CSS.
gulp.task('css', function() {
  return gulp.src(config.css.src)
    .pipe(glob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
        }) (error);
        this.emit('end');
      }}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      includePaths: config.css.includePaths
    }))
    .pipe(autoprefix('last 2 versions', '> 1%', 'ie 9', 'ie 10'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.reload({ stream: true, match: '**/*.css' }));
});

// Watch task.
gulp.task('watch', function() {
  gulp.watch(config.css.src, ['css']);
});

// Static Server + Watch
gulp.task('serve', ['css', 'watch'], function() {
  browserSync.init({
    proxy: config.browserSyncProxy
  });
});

// Default Task
gulp.task('default', ['serve']);
