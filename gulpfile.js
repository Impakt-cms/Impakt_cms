var gulp        = require('gulp');
var concat      = require('gulp-concat');
var ngAnnotate  = require('gulp-ng-annotate');
var uglify      = require('gulp-uglify');
var nodemon     = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('build', function () {
	gulp.src(['public/admin/js/app.js',
		'!public/admin/js/bundle.js',
		'public/admin/**/*.js'])
		.pipe(ngAnnotate())
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/admin/js'))
})

gulp.task('start', ['watch'], function () {
	nodemon({
		script: 'server.js'
		, ext: 'js html'
		, env: { 'NODE_ENV': 'development' }
	})
})

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "localhost:8080"
    });
})

gulp.task('watch', ['browser-sync'], function () {
	gulp.watch('public/admin/**/*.js', ['build']);
	gulp.watch('public/admin/css/*.css').on('change', browserSync.reload);
})