class Bird {
    constructor(options) {
        this.canvas = options.canvas;

        this.gl = this.canvas.getContext('webgl');
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.shaders = {
            bird: {
                vertex:   this.compileShader(this.gl.VERTEX_SHADER,   options.shaders.bird.vertex),
                fragment: this.compileShader(this.gl.FRAGMENT_SHADER, options.shaders.bird.fragment)
            },
            dots: {
                vertex:   this.compileShader(this.gl.VERTEX_SHADER,   options.shaders.dots.vertex),
                fragment: this.compileShader(this.gl.FRAGMENT_SHADER, options.shaders.dots.fragment)
            },
            trackdots: {
                vertex:   this.compileShader(this.gl.VERTEX_SHADER,   options.shaders.trackdots.vertex),
                fragment: this.compileShader(this.gl.FRAGMENT_SHADER, options.shaders.trackdots.fragment)
            },
            trackdots2: {
                vertex:   this.compileShader(this.gl.VERTEX_SHADER,   options.shaders.trackdots2.vertex),
                fragment: this.compileShader(this.gl.FRAGMENT_SHADER, options.shaders.trackdots2.fragment)
            },
        };

        this.cameraOptions = {
            zoom: 0.3,
            angleY: Math.PI * 0.4,
            angleX: 0.0
        };

        this.programs = {
            bird: null,
            dots: null
        };

        this.calculateMatrices();
        this.createBirdGeometry();
        this.createPrograms();
        this.updateCanvasUniforms();
        this.updateMatrixUniforms();
        this.initEventListeners();
        this.updateCanvasSize();

        requestAnimationFrame(this.animate.bind(this));
    }


    calculateMatrices() {
        const x = -4;
        const y = -0.5;

        this.modelMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, 0, 1
        ];

        const z = this.cameraOptions.zoom;
        const a = this.cameraOptions.angleY;
        const b = this.cameraOptions.angleX;

        this.viewMatrix = [
            z *  Math.cos(b),               0,               z * -Math.sin(b),               0,
            z * -Math.sin(a) * Math.sin(b), z * Math.cos(a), z * -Math.sin(a) * Math.cos(b), 0,
            z *  Math.cos(a) * Math.sin(b), z * Math.sin(a), z *  Math.cos(a) * Math.cos(b), 0,
            0,                              0,                   0,                          1
        ];

        const s = 1 / (Math.tan(90 * Math.PI / 360));
        const n = -1;
        const f = 10.0;

        this.projectionMatrix = [
            s, 0, 0,          0,
            0, s, 0,          0,
            0, 0, -(f)/(f-n), -1,
            0, 0, -f*n/(f-n), 1
        ];
    }


    createBirdGeometry() {
        const points = [];

        const stepX = 0.4;
        const stepY = 0.2;

        for (let x = 0; x <= 8; x += stepX) {
            for (let y = 0; y <= 1; y += stepY) {
                if (y === 0) {
                    points.push(x);
                    points.push(y);
                    points.push(x + stepX);
                    points.push(y);
                }

                points.push(x + stepX);
                points.push(y);
                points.push(x + stepX);
                points.push(y + stepY);
                points.push(x + stepX);
                points.push(y + stepY);
                points.push(x);
                points.push(y + stepY);
                points.push(x);
                points.push(y + stepY);
                points.push(x);
                points.push(y);
                points.push(x);
                points.push(y);
                points.push(x + stepX);
                points.push(y + stepY);
            }
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(points),
            this.gl.STATIC_DRAW
        );
    }


    compileShader(type, source) {
        const shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        console.log(this.gl.getShaderInfoLog(shader));

        return shader;
    }


    createPrograms() {
        this.createProgramByName('bird');
        this.createProgramByName('dots');
        this.createProgramByName('trackdots');
        this.createProgramByName('trackdots2');
    }
    
    
    createProgramByName(name) {
        this.programs[name] = this.gl.createProgram();

        this.gl.attachShader(this.programs[name], this.shaders[name].vertex);
        this.gl.attachShader(this.programs[name], this.shaders[name].fragment);
        this.gl.linkProgram(this.programs[name]);

        const vertexPositionAttribute = this.gl.getAttribLocation(this.programs[name], 'a_position');

        this.gl.enableVertexAttribArray(vertexPositionAttribute);
        this.gl.vertexAttribPointer(vertexPositionAttribute, 2, this.gl.FLOAT, false, 0, 0);
    }


    updateMatrixUniforms() {
        this.updateMatrixUniformsForProgram(this.programs.bird);
        this.updateMatrixUniformsForProgram(this.programs.dots);
        this.updateMatrixUniformsForProgram(this.programs.trackdots);
        this.updateMatrixUniformsForProgram(this.programs.trackdots2);
    }


    updateMatrixUniformsForProgram(program) {
        this.gl.useProgram(program);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(program, 'u_model_matrix'),      false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(program, 'u_view_matrix'),       false, this.viewMatrix);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(program, 'u_projection_matrix'), false, this.projectionMatrix);
    }


    updateCanvasUniforms() {
        this.updateCanvasUniformsForProgram(this.programs.bird);
        this.updateCanvasUniformsForProgram(this.programs.dots);
        this.updateCanvasUniformsForProgram(this.programs.trackdots);
        this.updateCanvasUniformsForProgram(this.programs.trackdots2);
    }


    updateCanvasUniformsForProgram(program) {
        this.gl.useProgram(program);
        this.gl.uniform1f(this.gl.getUniformLocation(program, 'u_canvas_height'), this.canvas.height);
        this.gl.uniform1f(this.gl.getUniformLocation(program, 'u_canvas_width'),  this.canvas.width);
    }


    updateTimeUniform(timeStamp) {
        this.updateTimeUniformForProgram(this.programs.bird, timeStamp);
        this.updateTimeUniformForProgram(this.programs.dots, timeStamp);
        this.updateTimeUniformForProgram(this.programs.trackdots, timeStamp);
        this.updateTimeUniformForProgram(this.programs.trackdots2, timeStamp);
    }


    updateTimeUniformForProgram(program, timeStamp) {
        this.gl.useProgram(program);
        this.gl.uniform1f(this.gl.getUniformLocation(program, 'u_time'), timeStamp / 1000.0);
    }


    updateCanvasSize() {
        this.canvas.height = Math.ceil(window.innerHeight);
        this.canvas.width = Math.ceil(window.innerWidth);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.updateCanvasUniforms();
    }


    updateCameraAngles(mouseX, mouseY) {
        const modX = (mouseX - window.innerWidth / 2) / window.innerWidth;
        const modY = (mouseY - window.innerHeight / 2) / window.innerHeight;

        this.cameraOptions.angleY = Math.PI * 0.4 + modY / 4;
        this.cameraOptions.angleX = modX;

        this.calculateMatrices();
        this.updateMatrixUniforms();
    }


    initEventListeners() {
        window.addEventListener('resize', this.updateCanvasSize.bind(this));

        document.body.addEventListener('mousemove', (e) => {
            this.updateCameraAngles(e.clientX, e.clientY);
        });
    }


    animate(timeStamp) {
        this.gl.clearColor(0.0, 0.0, 0.05, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.updateTimeUniform(timeStamp);

        this.gl.useProgram(this.programs.trackdots);
        this.gl.drawArrays(this.gl.POINTS, 0, 1000);

        this.gl.useProgram(this.programs.bird);
        this.gl.drawArrays(this.gl.LINES, 0, 1000);

        this.gl.useProgram(this.programs.dots);
        this.gl.drawArrays(this.gl.POINTS, 0, 1000);

        this.gl.useProgram(this.programs.trackdots2);
        this.gl.drawArrays(this.gl.POINTS, 0, 1000);

        requestAnimationFrame(this.animate.bind(this));
    }
}



const myBird = new Bird({
    canvas:         document.getElementById('bird-canvas'),
    shaders: {
        bird: {
            vertex:   document.getElementById('bird-vertex-shader').textContent,
            fragment: document.getElementById('bird-fragment-shader').textContent
        },
        dots: {
            vertex:   document.getElementById('bird-dots-vertex-shader').textContent,
            fragment: document.getElementById('bird-dots-fragment-shader').textContent
        },
        trackdots: {
            vertex:   document.getElementById('bird-trackdots-vertex-shader').textContent,
            fragment: document.getElementById('bird-trackdots-fragment-shader').textContent
        },
        trackdots2: {
            vertex:   document.getElementById('bird-trackdots2-vertex-shader').textContent,
            fragment: document.getElementById('bird-trackdots2-fragment-shader').textContent
        },
    }
});