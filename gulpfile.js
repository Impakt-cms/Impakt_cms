var gulp = require('gulp')
var concat = require('gulp-concat')
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('build', function () {
  gulp.src(['public/admin/js/*.js'])
    .pipe(ngAnnotate())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('.'))
})

gulp.task('watch', function () {
  gulp.watch('public/admin/**/*.js', ['build'])
})