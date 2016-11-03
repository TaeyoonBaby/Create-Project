/**
 * Created by 태유니 on 2016-10-26.
 */
var tBoard = function (tableId, topDivId, pageDivId, buttonDivId, tableValue) {
    this.tableId = tableId;
    this.topDivId = topDivId;
    this.pageDivId = pageDivId;
    this.buttonDivId = buttonDivId;
    this.tableValue = tableValue;

    //TopDiv에 들어가는 값들
    this.searchTextArr = ["cSearch", "bSearch", "cmSearch", "uSearch", "cfSearch", "cfDate"];
    this.searchTextPlaceHorderArr = ["회사명", "비즈니스명", "상대사원명", "본사원명", "글제목"];
    this.searchSelectArr = ["bsfSF"];
    this.searchSelectOption = ["No Option", "진행중", "실패", "성공"];
    this.searchButtonArr = ["submitBtn"];

    //divButton 들
    this.buttonArr = ["write", "graphGo", "submitBtn", "dateBtn"];

    this.allCreate = function () {
        this.emptyAll();
        this.topDivCreate();
        this.tableCreate();
        this.buttonDivCreate();
    };

    //main.php  --> empty All
    this.emptyAll = function () {
        $('#' + this.tableId).empty();
        $('#' + this.topDivId).empty();
        $('#' + this.pageDivId).empty();
        $('#' + this.buttonDivId).empty();
    };

    //TopDiv Create Value
    this.topDivCreate = function () {
        var topDiv = new tTopDiv(this.topDivId, this.searchTextArr, this.searchTextPlaceHorderArr, this.searchSelectArr, this.searchSelectOption, this.searchButtonArr);
        topDiv.topDivCreate();
        var keyUp = new keyUpOption();
        keyUp.board();
    };

    this.tableCreate = function () {
        var table = new mTable(this.tableId, this.pageDivId, this.tableValue);
        table.bulletinBoard();
    };

    this.buttonDivCreate = function () {
        var button = new buttonDiv(this.buttonDivId);
        button.board();
    };
};

var tTopDiv = function (id, textArr, placeArr, selectArr, optionArr, buttonArr) {
    this.id = id;
    this.textArr = textArr;
    this.placeArr = placeArr;
    this.selectArr = selectArr;
    this.optionArr = optionArr;
    this.buttonArr = buttonArr;

    this.topDivCreate = function () {
        this.topDivInput_Text_Button();
        this.topDivSelect();
        this.topDivButton();
    };

    this.topDivInput_Text_Button = function () {
        //Create Input text & input button
        for (var index = 0; index < this.textArr.length; index++) {
            if (this.textArr[index] != "cfDate") {
                $('<input id=' + this.textArr[index] + ' type="text" placeholder=' + this.placeArr[index] + '>').appendTo('#' + this.id);
            } else if (this.textArr[index] == "cfDate") {
                $('<span id=' + this.textArr[index] + '><input type="button" value="날짜" id="dateInput"></span>').appendTo('#' + this.id);
                $('#' + this.textArr[index]).click(function () {
                    $('#' + this.id).html('<input type="text" id="dateInput">');
                    $('#dateInput').datepicker({
                        dateFormat: 'yy-mm-dd',
                        prevText: '이전 달',
                        nextText: '다음 달',
                        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                        dayNames: ['일','월','화','수','목','금','토'],
                        dayNamesShort: ['일','월','화','수','목','금','토'],
                        dayNamesMin: ['일','월','화','수','목','금','토'],
                        showMonthAfterYear: true,
                        changeMonth: true,
                        changeYear: true,
                        yearSuffix: '년'
                    });
                });
            }
        }

    };

    this.topDivSelect = function () {
        //Create Select
        for (var indexY = 0; indexY < this.selectArr.length; indexY++) {
            $('<select id=' + this.selectArr[indexY] + '></select>').appendTo('#' + this.id);

            //Create Select <-- Option
            for (var indexX = 0; indexX < this.optionArr.length; indexX++) {
                $('<option value=' + indexX + '>' + this.optionArr[indexX] + '</option>').appendTo('#' + this.selectArr[indexY]);
            }
        }
    };

    this.topDivButton = function () {
        //Create Button
        for (var index = 0; index < this.buttonArr.length; index++) {
            $('<input id=' + this.buttonArr[index] + ' type="button" value="검색">').appendTo('#' + this.id);
            $('#' + this.buttonArr[index]).click(function () {
                controller.search();
            });
        }
    };
};

var mTable = function (id, pid, tableValue) {
    this.id = id;
    this.pid = pid;
    this.tableValue = tableValue;
    this.tableLength = 0;
    this.startB = this.tableValue[this.tableLength - 2];
    this.endB = this.tableValue[this.tableLength - 1];
    this.start = sessionStorage.getItem("pageNum") * 1;

    this.bulletinBoard = function () {
        this.tableLength = this.tableValue.length - 2;
        $('<tr><th>번호</th><th>회사명</th><th>비즈니스명</th><th>제목</th><th>상대사원</th><th>본사사원</th><th>장소</th><th>Date</th><th>시작 시간</th><th>끝난 시간</th></tr>').appendTo("#" + this.id);
        for (var indexY = 0; indexY < this.tableLength; indexY++) {
            $('<tr id="tr"></tr>').appendTo('#' + this.id);
            $('#tr').attr({id: "tr" + indexY});
            for (var indexX = 0; indexX < this.tableValue[indexY].length; indexX++) {
                if (indexX == 3) {
                    $('<td><a id="title" style="color: #007fff; cursor:pointer;">' + this.tableValue[indexY][indexX] + '</a></td>').appendTo('#tr' + indexY);
                    $('#title').attr({id: this.tableValue[indexY][0]});

                    $('#' + this.tableValue[indexY][0]).click(function () {
                        controller.titleClick(this.id);
                    });

                } else {
                    $('<td>' + this.tableValue[indexY][indexX] + '</td>').appendTo('#tr' + indexY);
                }
            }
        }

        for (var i = this.startB; i <= this.endB; i++) {
            if ((this.start + 1) == i) {
                $('<b>' + i + '</b>').appendTo('#' + this.pid);
            } else {
                $("<a id='num' style='cursor:pointer; margin-right: 2px;'>" + i + "</a>").appendTo('#' + this.pid);
                $('#num').attr({id: "num" + i});
                $('#num' + i).click(function () {
                    controller.pageNumClick(this.id.split('num')[1]);
                });
            }
        }
    };

    this.title = function () {
        this.tableLength = this.tableValue.length;
        var tdVal = ["상대회사", "상대영업사원", "비즈니스명", "비즈니스 진행상황", "날짜", "만난 시간", "끝난 시간", "장소", "제목", "내용"];

        for (var index = 0; index < this.tableLength; index++) {
            $('<tr id="tr"></tr>').appendTo('#' + this.id);
            $('#tr').attr({id: "tr" + index});
        }

        for (var i = 0; i < this.tableLength; i++) {
            $('<td class="title" style="width: 20%">' + tdVal[i] + '</td><td>' + this.tableValue[i] + '</td>').appendTo('#tr' + i);
        }
    };

    this.write = function () {
        for (var index = 1; index <= 10; index++) {
            $('<tr id="tr"></tr>').appendTo('#' + this.id);
            $('#tr').attr({id: "tr" + index});
        }

        $('<td class="title" style="width: 20%">상대회사</td><td><input type="text" name="cNum" id="cNum"></td>').appendTo('#tr1');
        $('<td class="title">상대영업사원</td><td><input type="text" name="cmNum" id="cmNum"></td>').appendTo('#tr2');
        $('<td class="title">비즈니스명</td><td><input type="text" name="bNum" id="bNum"></td>').appendTo('#tr3');
        $('<td class="title">비즈니스 진행상황</td><td><select name="bSf" id="bSf"><option value="0">진행중</option><option value="1">실패</option><option value="2">성공</option></select></td>').appendTo('#tr4');
        $('<td class="title">날짜</td><td><input type="date" name="cfDate" id="cfDate"></td>').appendTo('#tr5');
        $('<td class="title">만난 시간</td><td><input type="time" name="cfStartTime" id="cfStartTime"></td>').appendTo('#tr6');
        $('<td class="title">끝난 시간</td><td><input type="time" name="cfEndTime" id="cfEndTime"></td>').appendTo('#tr7');
        $('<td class="title">장소</td><td><input type="text" name="cfPlace" id="cfPlace"></td>').appendTo('#tr8');
        $('<td class="title">제목</td><td><input type="text" name="cfTitle" id="cfTitle"></td>').appendTo('#tr9');
        $('<td class="title">내용</td><td><textarea name="cfContents" id="cfContents" style="resize:none;" onkeyup="resize(this)"></textarea></td>').appendTo('#tr10');
    }
};

var buttonDiv = function (id) {
    this.buttonDivId = id;

    this.board = function () {
        $('<input type="button" value="글쓰기" id="writeGo">').appendTo('#' + this.buttonDivId);
        $('#writeGo').click(function () {
            controller.writePage();
        });
    };

    this.write = function () {
        $('<input type="button" value="완료" id="writeClear">').appendTo('#' + this.buttonDivId);
        $('<input type="button" value="뒤로가기" id="writeBack">').appendTo('#' + this.buttonDivId);
        $('#writeClear').click(function () {
            controller.writeClear();
        });
        $('#writeBack').click(function () {
            controller.boardPage(0, "no");
        });
    };

    this.title = function () {
        $('<input type="button" value="뒤로가기" id="titleBack">').appendTo('#' + this.buttonDivId);
        $('#titleBack').click(function () {
            controller.boardPage(sessionStorage.getItem('pageNum'), sessionStorage.getObject('where'));
        });
    }
};

var mTitle = function (tableId, topDivId, pageDivId, buttonDivId, tableValue) {
    this.tableId = tableId;
    this.topDivId = topDivId;
    this.pageDivId = pageDivId;
    this.buttonDivId = buttonDivId;
    this.tableValue = tableValue;

    this.allCreate = function () {
        this.emptyAll();
        this.tableCreate();
        this.buttonDivCreate();
    };

    //main.php  --> empty All
    this.emptyAll = function () {
        $('#' + this.tableId).empty();
        $('#' + this.topDivId).empty();
        $('#' + this.pageDivId).empty();
        $('#' + this.buttonDivId).empty();
    };

    this.tableCreate = function () {
        var table = new mTable(this.tableId, this.pageDivId, this.tableValue);
        table.title();
    };

    this.buttonDivCreate = function () {
        var button = new buttonDiv(this.buttonDivId);
        button.title();
    };
};

var mWrite = function (tableId, topDivId, pageDivId, buttonDivId) {
    this.tableId = tableId;
    this.topDivId = topDivId;
    this.pageDivId = pageDivId;
    this.buttonDivId = buttonDivId;

    this.allCreate = function () {
        this.emptyAll();
        this.tableCreate();
        this.buttonDivCreate();
    };

    //main.php  --> empty All
    this.emptyAll = function () {
        $('#' + this.tableId).empty();
        $('#' + this.topDivId).empty();
        $('#' + this.pageDivId).empty();
        $('#' + this.buttonDivId).empty();
    };

    this.tableCreate = function () {
        var table = new mTable(this.tableId, this.pageDivId, 0);
        table.write();
        var keyUp = new keyUpOption();
        keyUp.write();
    };

    this.buttonDivCreate = function () {
        var button = new buttonDiv(this.buttonDivId);
        button.write();
    };
};

function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (20 + obj.scrollHeight) + "px";
}

var keyUpOption = function () {
    this.board = function () {
        $('#cSearch').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#cSearch').val();
                if (val.length > 1) {
                    controller.keywordSearch("cSearch", "cName", val);
                }
            }
        });
        $('#bSearch').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#bSearch').val();
                if (val.length > 1) {
                    controller.keywordSearch("bSearch", "bName", val);
                }
            }
        });
        $('#cmSearch').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#cmSearch').val();
                if (val.length > 1) {
                    controller.keywordSearch("cmSearch", "cmName", val);
                }
            }
        });
        $('#uSearch').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#uSearch').val();
                if (val.length > 1) {
                    controller.keywordSearch("uSearch", "uName", val);
                }
            }
        });
        $('#cfSearch').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#cfSearch').val();
                if (val.length > 1) {
                    controller.keywordSearch("cfSearch", "cfTitle", val);
                }
            }
        });
    };
    this.write = function () {
        $('#cNum').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#cNum').val();
                if (val.length > 1) {
                    controller.keywordSearch("cNum", "cName", val);
                }
            }
        });

        $('#cmNum').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#cmNum').val();
                if (val.length > 1) {
                    controller.keywordSearch("cmNum", "cmName", val);
                }
            }
        });

        $('#bNum').keyup(function (e) {
            if (e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 40) {
                var val = $('#bNum').val();
                if (val.length > 1) {
                    controller.keywordSearch("bNum", "bName", val);
                }
            }
        });
    }
};
