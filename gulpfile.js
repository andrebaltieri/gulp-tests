var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var cssmin = require('gulp-minify-css');
var jsValidate = require('gulp-jsvalidate');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');
var webserver = require('gulp-webserver');

gulp.task('specs', function() {
  return gulp.src('specs/**.js').pipe(jasmine());
});

gulp.task('spec-watch', function() {
  gulp.watch(['specs/**.js', 'contents/javascripts/**.js'], ['specs'])
});

gulp.task("homepage", function() {
  return gulp.src("contents/index.html").pipe(gulp.dest("build"));
});


gulp.task('javascript', function() {
  return gulp.src("contents/javascripts/**.js")
    .pipe(jsValidate())
    .on("error", notify.onError(function(error) {
      return error.message;
    }))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/javascripts'))
    .pipe(notify("Scripts processados"));
});

gulp.task('clean', [], function() {
  return gulp.src('build/*', {
      read: false
    })
    .pipe(clean())
    .pipe(notify("Pasta de publicação limpa!"));
});

gulp.task('css', [], function() {
  //gulp.src('contents/styles/**.*').pipe(gulp.dest('build/styles'));
  return gulp.src('contents/styles/**.*')
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('build/styles'))
    .pipe(notify("Frontend pronto para deploy :)"));
});

gulp.task('watch', [], function() {
  return gulp.watch(['contents/**'], ['default']);
});

gulp.task('webserver', function() {
  return gulp.src('build').pipe(webserver({
    livereload: true
  }));
});

gulp.task('default', ['clean', 'css', 'homepage', 'javascript']);
