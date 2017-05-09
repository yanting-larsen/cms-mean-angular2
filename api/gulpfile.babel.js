import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';
import mongoose from 'mongoose';

import Admin from './models/admin';

// Load the gulp plugins into the `plugins` variable
const plugins = loadPlugins();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**']
};

// Compile all Babel Javascript into ES5 and put it into the dist dir
gulp.task('babel', () => {
  return gulp.src(paths.js, { base: '.' })
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist'));
});

// Start server with restart on file change events
gulp.task('nodemon', ['babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['babel']
  })
);

// Create first admin
gulp.task('create-admin', ['babel'], () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log(err);
    });

    db.on('connected', () => {
        Admin.findOne({ userName: process.env.ADMIN_USER }).then(admin => {
            if (!admin) {
                Admin.create({
                    fullName: "Super Admin",
                    userName: process.env.ADMIN_USER,
                    password: process.env.ADMIN_PASSWORD
                })
            }
        });
    });
});