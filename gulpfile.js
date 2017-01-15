﻿var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('lint', function () {
    gulp.src('./**/*.js')
      .pipe(jshint())
})

gulp.task('develop', function () {
    var stream = nodemon({
        script: './bin/www'
            , ext: 'html js'
            , ignore: ['ignored.js']
            , tasks: ['lint']
    })

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function () {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds 
        })
})