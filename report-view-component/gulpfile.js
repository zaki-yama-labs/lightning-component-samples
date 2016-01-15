var componentName = 'HereIsYourComponentName';

var gulp = require('gulp');
var zip = require('gulp-zip');
var browserify = require('browserify');
var debowerify = require('debowerify');
var source = require('vinyl-source-stream');
var deamd = require('deamd');
var through2 = require('through2');
var jsforce = require('jsforce');
var notify = require('gulp-notify');

// ref. https://github.com/vigetlabs/gulp-starter/blob/master/gulpfile.js/lib/handleErrors.js
var handleErrors = function(err, callback) {
  notify.onError({
    message: err.toString().split(': ').join(':\n'),
    sound: false
  }).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') {
    this.emit('end');
  }
}

var forceDeploy = function(username, password) {
  return through2.obj(function(file, enc, callback) {
    var conn;
    conn = new jsforce.Connection();
    return conn.login(username, password).then(function() {
      return conn.metadata.deploy(file.contents).complete({
        details: true
      });
    })
    .then(function(res) {
      if (res.details !== null && !res.success){
        console.error(res);
        console.log('***************ERROR DETAILS***************');
        console.error(res.details.componentFailures);
        return callback(new Error('Deploy failed.'));
      }
      return callback();
    }, function(err) {
      console.error(err);
      return callback(err);
    });
  });
};

gulp.task('build', function() {
  return browserify({
    entries: ['./src/scripts/'+ componentName +'.js'],
    standalone: componentName
  }).transform(debowerify)
  .bundle()
  .on('error', handleErrors)
  .pipe(source(componentName + '.resource'))
  .pipe(deamd())
  .pipe(gulp.dest('pkg/staticresources/'));
});

gulp.task('deploy', function() {
  return gulp.src('pkg/**/*', {
    base: '.'
  })
  .pipe(zip('pkg.zip'))
  .pipe(forceDeploy(process.env.SF_USERNAME, process.env.SF_PASSWORD))
  .on('error', handleErrors);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['build']);
  gulp.watch('pkg/**/*', ['deploy']);
});

gulp.task('default', ['build', 'deploy']);
