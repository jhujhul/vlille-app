'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    express: {
      dev: {
        options: {
          port: 8000,
          script: 'server.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      public: {
        files: [
          'client/app/**/*.css',
          'client/app/**/*.js',
          'client/app/**/*.html',
          'client/index.html'
        ]
      }
    },
    ngconstant: {
      options: {
        name: 'config',
        dest: 'client/app/app.config.js'
      },
      dev: {
        constants: {
          config: grunt.file.readJSON('client/config-dev.json')
        }
      }
    },
    clean: ['dist/', '.tmp/'],
    ngtemplates:  {
      app:        {
        cwd:      'client',
        src:      'app/**/*.html',
        dest:     'client/app/app.templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          },
          usemin: 'js/scripts.js'
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            src: 'client/index.html',
            dest: 'dist/index.html'
          },
          {
            expand: true,
            cwd: 'client/',
            src: ['assets/**'],
            dest: 'dist/'
          }
        ]
      }
    },
    useminPrepare: {
      html: 'client/index.html',
      options: {
        root: 'client',
        dest: 'dist'
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          src: '.tmp/concat/js/scripts.js',
          dest: '.tmp/concat/js/scripts.js'
        }, {
          src: '.tmp/concat/js/vendor.js',
          dest: '.tmp/concat/js/vendor.js'
        }]
      }
    },
    usemin: {
      html: ['dist/index.html']
    }
  });

  grunt.registerTask('serve', 'Start a local web server', function () {

    grunt.task.run([
      'ngconstant:dev',
      'express',
      'watch'
    ]);

  });

  grunt.registerTask('build', 'Build webapp for deployment', function(env) {
    var env = env || 'dev';

    grunt.task.run([
      'clean',
      'ngconstant:' + env,
      'copy',
      'useminPrepare',
      'ngtemplates',
      'concat:generated',
      'ngAnnotate',
      'cssmin:generated',
      'uglify:generated',
      'usemin'
    ]);
  });

};
