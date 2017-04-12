module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    base:{
      app: "app",
      dist: "dist"
    },
    connect: {
      dev: {
        options: {
          port: 9000,
          base: '<%= base.app %>',
          livereload: true
        }
      },
      dist: {
        options: {
          port: 9001,
          base: '<%= base.dist %>',
          keepalive: true
        }
      }
    },
    copy: {
      main: {
        cwd: '<%= base.app %>/',
        src: [
          'index.html',
          'img/**',
          'video/**',
          //'css/**',
          '**/*.html',
          '**/*.json',
          '_admin/_rsvp.php',
          '!bower_components/**/*'
        ],
        dest: '<%= base.dist %>',
        expand: true
      },
      fonts: {
        cwd: '<%= base.app %>/bower_components/font-awesome/fonts/',
        src: [
          '*'
        ],
        dest: '<%= base.dist %>/fonts',
        expand: true
      }
    },
    useminPrepare: {
      html: {
        src: ['<%= base.app %>/index.html'],
        dest: '<%= base.dist %>'
      }
    },
    usemin: {
      html: '<%= base.dist %>/index.html',
    },
    ngmin: {
      generated:{
        src: ['.tmp/concat/js/app.js'],
        dest: '.tmp/concat/js/app.js'
      } 
    },
    jshint: {
      files: ['<%= base.app %>/js/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['**/*.js']
      //tasks: ['jshint']
    },
    ftp_push: {
      prod: {
        options: {
          authKey: "erik",
          host: "72.52.231.174",
          dest: "/public_html",
          port: 21
        },
        files: [
          {
            expand: true,
            cwd: '<%= base.dist %>',
            src: ['**/*']
          }
        ]
      },
      dev: {
        options: {
          authKey: "erik",
          host: "72.52.231.174",
          dest: "/public_html/<%= grunt.option(\"deployToFolder\") %>",
          port: 21
        },
        files: [
          {
            expand: true,
            cwd: '<%= base.dist %>',
            src: ['**/*']
          }
        ]
      }
    },
    clean: {
      dist: {
        src: ['<%= base.dist %>']
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'useminPrepare:html',
    'concat:generated',
    'cssmin:generated',
    'ngmin:generated',
    'uglify:generated',
    //'filerev',
    'usemin'
  ]);

  grunt.registerTask('server', function(target){
    if(!target) target = 'dev';
    if(target === 'dist'){
       grunt.task.run('build');
    }
    grunt.task.run(
      'connect:'+target,
      'watch'
    );
  });

  grunt.registerTask('deploy', function(target, folder){
    if(!folder) folder = 'test'
    if(!target) target = 'dev';
    if(target == "prod") folder = "root";
    grunt.option("deployToFolder", folder);
    grunt.log.write("Deploying to '"+folder+"' folder on "+target+" server...");
    grunt.task.run(
      'build',
      'ftp_push:'+target
    );
  });
};