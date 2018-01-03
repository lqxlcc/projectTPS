// 引入gulp模块（前端js）
// 目的，将sass文件转换成css文件
// gulp得到一个函数或者对象
let gulp= require('gulp');
let sass = require('gulp-sass');
// 创建任务 ,目的编译sass文件
gulp.task('compileSass',function(){
    // 返回文件流，将文件当做一种液体
    gulp.src('./src/sass/*.scss').pipe(sass({outputStyle:'compact'})).pipe(gulp.dest('./src/css'));
    
});
// g监听sass文件修改，自动编译
    gulp.task('jtSass',function(){
        gulp.watch('./src/sass/*.scss',['compileSass']);
    });
// gulpfile有修改要重新运行
