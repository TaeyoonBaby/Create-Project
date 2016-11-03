<html>
<head>
    <meta charset="utf-8">
    <meta title="B2B">
    <link rel="stylesheet" type="text/css" href="/public/jquery-ui.min.css"/>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even){background-color: #f2f2f2}

        th {
            background-color: #4CAF50;
            color: white;
        }
        
        .title {
            background-color: #4CAF50;
            color: white;
        }

        table input {
            width: 50%;
        }

        table textarea {
            width: 50%;
        }
    </style>
</head>


<body>
<div id="inputO">

</div>

<table id="bulletinBoard" style="margin-right: auto; margin-left: auto; margin-top: 50px;">

</table>

<div id="page" style="margin-right: auto; margin-left: auto; text-align: center">

</div>

<div id="buttonO" style="float:right">
    
</div>

<script src="/public/jquery-3.1.1.min.js"></script>
<script src="/public/jquery-ui.min.js"></script>
<script src="/public/view.js"></script>
<script src="/public/model.js"></script>
<script src="/public/controller.js"></script>


<script>
    var controller = new controller();
    controller.boardPage(0,"no");
</script>

</body>
</html>