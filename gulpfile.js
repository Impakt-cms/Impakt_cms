var gulp       = require('gulp')
var concat     = require('gulp-concat')
var ngAnnotate = require('gulp-ng-annotate');
var uglify     = require('gulp-uglify');

gulp.task('build', function () {
  gulp.src(['public/admin/js/app.js',
  	'!public/admin/js/bundle.js',
	'public/admin/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/admin/js'))
})

gulp.task('watch', function () {
  gulp.watch('public/admin/**/*.js', ['build'])
})