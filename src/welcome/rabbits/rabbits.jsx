"use client"
import React, { useRef, useEffect, useState } from 'react';
import '../../app/css/rabbits.css';  // Assuming you save the CSS in a separate file named BallSimulator.css

function BallSimulator() {
    const canvasRef = useRef(null);
    const [mouse, setMouse] = useState({down: false, x: 0, y: 0});
    const [balls, setBalls] = useState([]);

    let NUM_BALLS = 10,
          DAMPING = 0.5,
          GRAVITY = 0.7,
          MOUSE_SIZE = 50,
          SPEED = 0.1;

          var resolve_collisions = function (ip) {

            var i = balls.length;
          
            while (i--) {
          
              var ball_1 = balls[i];
          
              if (mouse.down) {
          
                var diff_x = ball_1.x - mouse.x;
                var diff_y = ball_1.y - mouse.y;
                var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
                var real_dist = dist - (ball_1.radius + MOUSE_SIZE);
          
                if (real_dist < 0) {
          
                  var depth_x = diff_x * (real_dist / dist);
                  var depth_y = diff_y * (real_dist / dist);
          
                  ball_1.x -= depth_x * 0.005;
                  ball_1.y -= depth_y * 0.005;
                }
              }
          
              var n = balls.length;
          
              while (n--) {
          
                if (n == i) continue;
          
                var ball_2 = balls[n];
          
                var diff_x = ball_1.x - ball_2.x;
                var diff_y = ball_1.y - ball_2.y;
          
                var length = diff_x * diff_x + diff_y * diff_y;
                var dist = Math.sqrt(length);
                var real_dist = dist - (ball_1.radius + ball_2.radius);
          
                if (real_dist < 0) {
          
                    var vel_x1 = ball_1.x - ball_1.px;
                    var vel_y1 = ball_1.y - ball_1.py;
                    var vel_x2 = ball_2.x - ball_2.px;
                    var vel_y2 = ball_2.y - ball_2.py;

          
                  var depth_x = diff_x * (real_dist / dist);
                  var depth_y = diff_y * (real_dist / dist);
          
                  const CORRECTION_FACTOR = 0.1; // Experiment 
                    ball_1.x -= depth_x * CORRECTION_FACTOR;
                    ball_1.y -= depth_y * CORRECTION_FACTOR;

                    ball_2.x += depth_x * CORRECTION_FACTOR;
                    ball_2.y += depth_y * CORRECTION_FACTOR;
          
                  if (ip) {
                    
                    var pr1 = DAMPING * (diff_x * vel_x1 + diff_y * vel_y1) / length,
                    pr2 = DAMPING * (diff_x * vel_x2 + diff_y * vel_y2) / length;
                    console.log(pr1, pr2)
                    vel_x1 += pr2 * diff_x - pr1 * diff_x;
                    vel_x2 += pr1 * diff_x - pr2 * diff_x;
                    
                    vel_y1 += pr2 * diff_y - pr1 * diff_y;
                    vel_y2 += pr1 * diff_y - pr2 * diff_y;
                    const MAX_VELOCITY = 0.1;  

                    vel_x1 = Math.min(Math.max(vel_x1, -MAX_VELOCITY), MAX_VELOCITY);
                    vel_y1 = Math.min(Math.max(vel_y1, -MAX_VELOCITY), MAX_VELOCITY);
                    vel_x2 = Math.min(Math.max(vel_x2, -MAX_VELOCITY), MAX_VELOCITY);
                    vel_y2 = Math.min(Math.max(vel_y2, -MAX_VELOCITY), MAX_VELOCITY);
                    

                    ball_1.px = ball_1.x - vel_x1;
                    ball_1.py = ball_1.y - vel_y1;
          
                    ball_2.px = ball_2.x - vel_x2;
                    ball_2.py = ball_2.y - vel_y2;
                  }
                }
              }
            }
          };

    useEffect(() => {
    const canvas = canvasRef.current;
    
    const handleEvent = (e) => {
        // Handle the event, e.g., create a ball
        // And also check if there's an overlaying element and interact with it
        const overlayElement = document.elementFromPoint(e.clientX, e.clientY);
        if (overlayElement && overlayElement.classList.contains('overlay-div')) {
        // Do something with the overlay element
        console.log("123123")
        }
    };
    
    canvas.addEventListener('click', handleEvent);
    
    return () => {
        canvas.removeEventListener('click', handleEvent);
    };
    }, []);

    useEffect(() => {
        console.log(balls)
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext('2d');

        let TWO_PI = Math.PI * 2

        window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

        var Ball = function(x, y, radius) {

        this.x = x;
        this.y = y;

        this.px = x;
        this.py = y;

        this.fx = 0;
        this.fy = 0;

        this.radius = radius;
        };

        Ball.prototype.apply_force = function(delta) {

        delta *= delta;

        this.fy += GRAVITY;

        this.x += this.fx * delta;
        this.y += this.fy * delta;

        this.fx = this.fy = 0;
        };

        Ball.prototype.verlet = function() {

        var nx = (this.x * 2) - this.px;
        var ny = (this.y * 2) - this.py;

        this.px = this.x;
        this.py = this.y;

        this.x = nx;
        this.y = ny;
        };

        Ball.prototype.draw = function(ctx) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fill();
        };

        //-------------------------------------

        var check_walls = function() {

        var i = balls.length;

        while (i--) {

            var ball = balls[i];

            if (ball.x < ball.radius) {

                var vel_x = ball.px - ball.x;
                ball.x = ball.radius;
                ball.px = ball.x - vel_x * DAMPING;

            } else if (ball.x + ball.radius > canvas.width) {

                var vel_x = ball.px - ball.x;
                ball.x = canvas.width - ball.radius;
                ball.px = ball.x - vel_x * DAMPING;
            }

            if (ball.y < ball.radius) {

                var vel_y = ball.py - ball.y;
                ball.y = ball.radius;
                ball.py = ball.y - vel_y * DAMPING;

            } else if (ball.y + ball.radius > canvas.height) {

                var vel_y = ball.py - ball.y;
                ball.y = canvas.height - ball.radius;
                ball.py = ball.y - vel_y * DAMPING;
            }
        }
        };


        const update = () => {
           
            var iter = 6;

            var delta = SPEED / iter;

            while (iter--) {

                var i = balls.length;

                while (i--) {

                    balls[i].apply_force(delta);
                    balls[i].verlet();
                }

                resolve_collisions();
                check_walls();

                var i = balls.length;
                while (i--) balls[i].verlet();

                resolve_collisions(1);
                check_walls();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(27,220,244,0.3)';

            var i = balls.length;
            while (i--) balls[i].draw(ctx);

            if (mouse.down) {

                ctx.fillStyle   = 'rgba(0,0,0,0.1)';
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';

                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, MOUSE_SIZE, 0, TWO_PI);
                ctx.fill();
                ctx.stroke();
            }

            requestAnimFrame(update);

        };

        const addBall = (x, y, r) => {         
            var x = x || Math.random() * (canvas.width - 60) + 30,
            y = y || Math.random() * (canvas.height - 60) + 30,
            r = r || 10 + Math.random() * 20,
            s = true,
            i = balls.length;

        while (i--) {

            var ball = balls[i];
            var diff_x = ball.x - x;
            var diff_y = ball.y - y;
            var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

            if (dist < ball.radius + r) {
                s = false;
                break;
            }
        }

        if (s) {
            const newBall = new Ball(x, y, r);
            setBalls(prevBalls => [...prevBalls, newBall]);
        }
        };

        for (let i = 0; NUM_BALLS < 0; i++) {
            NUM_BALLS--
            addBall();
        }

        // Mouse Event Handlers
        const handleMouseDown = (e) => {
            if (e.which == 1) {
                addBall(mouse.x, mouse.y);
    
            } else if (e.which == 3) {
    
                mouse.down = true;
                document.body.style.cursor = 'none';
            }
    
            e.preventDefault();
        };

        const handleMouseUp = (e) => {
            if (e.which == 3) {

                mouse.down = false;
                document.body.style.cursor = 'default';
            }
    
            e.preventDefault();
        };

        const handleMouseMove = (e) => {
            var rect = canvasRef.current.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseOut = (e) => {
            mouse.down = false;
            document.body.style.cursor = 'default';
        };

        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Adding Event Listeners
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseout', handleMouseOut);
        canvas.addEventListener('contextmenu', handleContextMenu);
        requestAnimFrame(update);

        // Cleanup when the component is unmounted
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseout', handleMouseOut);
            canvas.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [balls]); // Empty dependency array means this effect will only run once, similar to componentDidMount

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    
    //     // Update canvas dimensions to match the display size
    //     canvas.width = canvas.offsetWidth;
    //     canvas.height = canvas.offsetHeight;
    
    //     // ... rest of your useEffect code ...
    // }, [balls]);

    return (
        <div className="ball-simulator-container">
            <canvas ref={canvasRef} width="100vw" height="100vh"></canvas>
            <div id="info">
                <a id="close" href="" onClick={(e) => e.preventDefault()}></a>
            </div>
        </div>
    );
}

export default BallSimulator;
