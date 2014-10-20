module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true,
                compress: true,
                sourceMap: "dist/app.map"
            },
            target: {
                src: "js/app.js",
                dest: "dist/app.min.js"
            }

        },
        jshint: {
            options: {
                eqeqeq: false,
                curly: true,
                undef: false,
                unused: true
            },
            target: {
                src: "js/app.js"

            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/styles.css': 'styles/styles.scss'
                }
            }

        },
        watch: {
            scripts: {
                files: ['styles/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.file.setBase('public/');
    grunt.registerTask('default', ["jshint", "sass", "uglify","watch"]);
};
