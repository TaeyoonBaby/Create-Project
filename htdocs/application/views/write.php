<html>
<head>
    <meta charset="utf-8">
    <meta title="B2B">
    <link rel="stylesheet" type="text/css" href="/public/jquery-ui.min.css" />
</head>

<body>
<br/><br/>
<form action="/write/write" method="post">
    <table border="1">
        <tr id="tr1">
            <td>상대회사</td>
            <td><input type="text" name="cNum" id="cNum" style="width: 300px">
                <input type="button" name="newC" id="newC" value="New Company"></td>
        </tr>
        <tr id="tr2">
            <td>상대영업사원</td>
            <td><input type="text" name="cmNum" id="cmNum" style="width: 300px">
                <input type="button" name="newCm" id="newCm" value="New CompanyMan"></td>
        </tr>
        <tr id="tr3">
            <td>비즈니스명</td>
            <td><input type="text" name="bNum" id="bNum" style="width: 300px">
                <input type="button" name="newB" id="newB" value="New Business"></td>
        </tr>
        <tr>
            <td>비즈니스 진행상황</td>
            <td><select name="bSf" id="bSf"><option value="0">진행중</option><option value="1">실패</option><option value="2">성공</option></select></td>
        </tr>
        <tr>
            <td>날짜</td>
            <td><input type="date" name="cfDate" id="cfDate" style="width: 300px"></td>
        </tr>
        <tr>
            <td>만난 시간</td>
            <td><input type="time" name="cfStartTime" id="cfStartTime" style="width: 300px"></td>
        </tr>
        <tr>
            <td>끝난 시간</td>
            <td><input type="time" name="cfEndTime" id="cfEndTime" style="width: 300px"></td>
        </tr>
        <tr>
            <td>장소</td>
            <td><input type="text" name="cfPlace" id="cfPlace" style="width: 300px"></td>
        </tr>
        <tr>
            <td>제목</td>
            <td><input type="text" name="cfTitle" id="cfTitle" style="width: 300px"></td>
        </tr>
        <tr>
            <td>내용</td>
            <td><textarea name="cfContents" id="cfContents" style="resize:none;width: 600px;" onkeyup="resize(this)"></textarea></td>
        </tr>
    </table>
    <input type="submit" value="완료">
</form>

<script src="/public/jquery-3.1.1.min.js"></script>
<script src="/public/jquery-ui.min.js"></script>
<script src="/public/controller.js"></script>
<script src="/public/view.js"></script>
<script>
    function resize(obj) {
        obj.style.height = "1px";
        obj.style.height = (20+obj.scrollHeight)+"px";
    }
    
</script>
</body>
</html>
