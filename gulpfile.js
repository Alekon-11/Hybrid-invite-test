"use strict";

const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const browsersync = require("browser-sync");

gulp.task("html", () => {
  return gulp.src("./index.html")
              .pipe(browsersync.stream());
});

gulp.task("build-styles", () => {
  return gulp.src('./sass/**/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./css'))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
  browsersync.init({
  server: "./",
  port: 4000,
  notify: true
  });
  
  gulp.watch('./sass/**/*.scss', gulp.parallel("build-styles"));
  gulp.watch('./index.html', gulp.parallel("html"));
});

gulp.task("build", gulp.parallel("build-styles", "html"));

gulp.task("default", gulp.parallel("watch", "build"));