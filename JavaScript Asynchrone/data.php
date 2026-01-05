<?php
sleep(3);

if (filter_has_var(INPUT_GET, 'bad')) {
    die(json_encode(false));
}

$obj = new stdClass();
$obj->id = 1;
$obj->name = "The Chef";
$obj->role = "admin";

echo json_encode($obj);
