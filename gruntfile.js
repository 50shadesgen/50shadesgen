module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['gruntfile.js', 'src/index.html', 'src/scss/*.scss', 'src/js/*.js'],
                tasks: ['clean:start', 'jshint', 'sass:build','concat:github', 'concat:build', 'copy:build'],
                options: {
                    spawn: false,
                },
            },
        },

        clean: {
            start: ['build/*'],
            finish: ['build/styles.css', 'build/scripts.js']
        },
        jshint: {
            all: ['gruntfile.js', 'src/js/*.js']
        },
        sass: {
            build: {
                files: {
                    'build/styles.css': 'src/scss/main.scss'
                }
            },
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'build/styles.css': 'src/scss/main.scss'
                }
            },
        },
        concat: {
            build: {
                src: [
                    'src/js/vocabulary.js',
                    'src/js/sentences.js',
                    'src/js/generator.js',
                    'src/js/events.js',
                    'src/js/ga.js'
                ],
                dest: 'build/scripts.js'
            },
            github: {
                src: [
                    'build/styles.css',
                    'bower_components/github-fork-ribbon-css/gh-fork-ribbon.css'
                ],
                dest: 'build/styles.css'
            },
            dist: {
                src: [
                    'build/styles.css',
                    'bower_components/github-fork-ribbon-css/gh-fork-ribbon.css'
                ],
                dest: 'build/styles.css'
            },
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'index.html',
                    dest: 'build/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        'index.html',
                        'error.html',
                        'favicon.ico',
                        'site_image.png'
                    ],
                    dest: 'build/'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'build/scripts.js': [
                        'src/js/vocabulary.js',
                        'src/js/sentences.js',
                        'src/js/generator.js',
                        'src/js/events.js',
                        'src/js/ga.js'
                    ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/styles.css': 'build/styles.css'
                }
            }
        },
        uncss: {
            dist: {
                files: {
                   'build/styles.css': ['build/index.html']
                }
            }
        },
        inline: {
            dist: {
                options:{
                    tag: ''
                },
                src: 'build/index.html',
                dest: 'build/index.html'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'clean:start',
        'jshint',
        'sass:dist',
        'copy:dist',
        'concat:dist',
        'uglify:dist',
        'uncss:dist',
        'cssmin:dist',
        'inline:dist',
        'htmlmin:dist',
        'clean:finish'
    ]);

};