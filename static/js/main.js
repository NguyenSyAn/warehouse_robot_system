$(document).ready(function() {
// Change this base on host ip network address 
$('#auto_content').hide();
$('#manual_content').show();

var host = 'localhost';
var port = '8080';
var socket = io.connect('http://'+ host +':' + port);


socket.on('connect', function() {
    socket.send('User has connected!');
});

socket.on('server_update_status', function(robots) {
    console.log(robots);
    for (i = 0; i < 20; i++) {
        $("#"+ i.toString()).css("background-color", "#ff000000");
        $("#"+ i.toString() + ">.robot_id").text("");
    }
    for(robot_id in robots){
        robot_status = robots[robot_id].robot_status;
        robot_x_pos = robots[robot_id].robot_x_pos;
        robot_y_pos = robots[robot_id].robot_y_pos;
        cell_id = robot_x_pos*4 + robot_y_pos;
        // console.log("cell_id: " + cell_id.toString());
        if(robot_status == 1){
            $("#"+ cell_id.toString()).css("background-color", "red");
        } else {
            $("#"+ cell_id.toString()).css("background-color", "green");
        }
        $("#"+ cell_id.toString() + ">.robot_id").text(robot_id.toString());
    }
});

$('input[type="checkbox"]').click(function(){
    if($(this).prop("checked") == true){
        $('#auto_content').show();
        $('#manual_content').hide();
    }
    else if($(this).prop("checked") == false){
        $('#auto_content').hide();
        $('#manual_content').show();
    }
});

$('#point_manual_submit').click(() => {
    robot_id = $('#robot_id').val();
    start_point = $('#start_point').val();
    head_point = $('#head_point').val();
    let payload = {
        start_point,
        head_point,
        robot_id
    };

    socket.emit('init_manual_points', payload);
});

$('#point_auto_submit').click (() => {
    start_point = $('#start_point').val();
    head_point = $('#head_point').val();
    target_point = $('#target_point').val();
    robot_id = $('#robot_id').val();
    let payload = {
        start_point,
        head_point,
        target_point,
        robot_id
    };
    socket.emit('init_auto_points', payload);
});

$('#moveForward').on('click', function() {
    robot_id = $('#robot_id').val();
    request_object = {
        'robot_id': robot_id,
        'commands': ['move_forward']
    };
    socket.emit('client_command', request_object);
});

$('#moveBackward').on('click', function() {
    robot_id = $('#robot_id').val();
    request_object = {
        'robot_id': robot_id,
        'commands': ['move_backward']
    };
    socket.emit('client_command', request_object);
});

$('#turnRight').on('click', function() {
    robot_id = $('#robot_id').val();
    request_object = {
        'robot_id': robot_id, 
        'commands': ['turn_right']
    };
    socket.emit('client_command', request_object);
});

$('#turnLeft').on('click', function() {
    robot_id = $('#robot_id').val();
    request_object = {
        'robot_id': robot_id, 
        'commands': ['turn_left']
    };
    socket.emit('client_command', request_object);
});

$('#pick').on('click', function() {
    robot_id = $('#robot_id').val();
    request_object = {
        'robot_id': robot_id, 
        'commands': ['pick']
    };
    socket.emit('client_command', request_object);
});

$('#drop').on('click', function() {
    robot_id = $('#robot_id').val();
    request_object = {
        'robot_id': robot_id, 
        'commands': ['drop']
    };
    socket.emit('client_command', request_object);
});

var cw = $('.square_ratio').width();
$('.square_ratio').css({
    'height': cw + 'px'
});
});