Finally, a javascript testing framework I can get my head around.  It's presently less than 100 lines, so just read source.

Here's hello world:

    <html>
      <head>
        <script src="kiss.js"></script>
        <script>
          var tests = new KISSUnit({
            setUp: function() {
              tests.foo = "bar";
            },
            testFoo: function(){
              assertTrue(true);
              assertEqual("bar", tests.foo);
            }      
          });
          window.onload = function() { tests.run(); }
        </script>
      </head>
      <body>
      </body>
    </html>