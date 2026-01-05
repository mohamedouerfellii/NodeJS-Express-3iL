<?php
$jsFiles = scandir(__DIR__ . '/js');
$jsFiles = array_filter($jsFiles, function ($f) {
    return substr($f, -3) === '.js' && strpos($f, '-') > 0;
});

$getFile = filter_input(INPUT_GET, 'js_file');
if ($getFile && file_exists('js/' . $getFile)) {
    $jsFileToUse = 'js/' . $getFile;
} else {
    $jsFileToUse = 'js/' . end($jsFiles);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Async</title>
</head>
<body>

<ul>
    <li><a href="index.php">Dernier</a></li>
    <?php foreach ($jsFiles as $f): ?>
        <li><a href="?js_file=<?php echo $f; ?>"><?php echo $f; ?></a></li>
    <?php endforeach; ?>
</ul>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="<?php echo $jsFileToUse; ?>"></script>

</body>
</html>
