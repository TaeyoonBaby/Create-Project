/**
 * Created by 태유니 on 2016-10-23.
 */
var controller = function () {
    this.tableId = "bulletinBoard";
    this.topDivId = "inputO";
    this.pageDivId = "page";
    this.buttonDivId = "buttonO";
    this.data = 0;
    this.model = new tModel();

    //main 페이지
    this.boardPage = function (start, where) {
        this.data = this.model.boardModel(start, where);
        var board = new tBoard(this.tableId, this.topDivId, this.pageDivId, this.buttonDivId, this.data);
        board.allCreate();
    };
    
    //글 쓰기 페이지
    this.writePage = function () {
        var write = new mWrite(this.tableId, this.topDivId, this.pageDivId, this.buttonDivId);
        write.allCreate();
    };

    //타이틀 클릭 시 페이지
    this.titleClick = function (titleNum) {
        var num = titleNum * 1;
        this.data = this.model.titleModel(num);

        var title = new mTitle(this.tableId, this.topDivId, this.pageDivId, this.buttonDivId, this.data);
        title.allCreate();
    };

    //페이지 넘버 클릭시
    this.pageNumClick = function (pageNum) {
        var num = (pageNum * 1) - 1;
        var where = sessionStorage.getObject('where');
        this.boardPage(num, where);
    };

    //글쓰기 완료
    this.writeClear = function () {
        var model = tModel();
        var cNum = $('#cNum').val();
        var cmNum = $('#cmNum').val();
        var bNum = $('#bNum').val();
        var bSf = $('#bSf').val();
        var cfDate = $('#cfDate').val();
        var cfStartTime = $('#cfStartTime').val();
        var cfEndTime = $('#cfEndTime').val();
        var cfPlace = $('#cfPlace').val();
        var cfTitle = $('#cfTitle').val();
        var cfContents = $('#cfContents').val();

        if (cNum == "" || cNum == " ") {
            alert("회사명을 입력하세요.");
        } else if (cmNum == "" || cmNum == " ") {
            alert("상대사원명을 입력하세요.");
        } else if (bNum == "" || bNum == " ") {
            alert("비즈니스명을 입력하세요.");
        } else if (cfDate == "" || cfDate == " ") {
            alert("Date를 입력하세요.");
        } else if (cfStartTime == "" || cfStartTime == " ") {
            alert("시작 시간을 입력하세요.");
        } else if (cfEndTime == "" || cfEndTime == " ") {
            alert("끝난 시간을 입력하세요.");
        } else if (cfPlace == "" || cfPlace == " ") {
            alert("장소를 입력하세요.");
        } else if (cfTitle == "" || cfTitle == " ") {
            alert("제목을 입력하세요.");
        } else if (cfContents == "" || cfContents == " ") {
            alert("내용을 입력하세요.");
        } else {
            this.model.writeGoMdel(cNum,cmNum,bNum,bSf,cfDate,cfStartTime,cfEndTime,cfPlace,cfTitle,cfContents);
            this.boardPage(0,"no");
        }
    };

    //조건 찾기
    this.search = function () {
        var where = this.setWhere();
        var model = new tModel();
        this.data = model.boardModel(0, where);

        var board = new tBoard(this.tableId, this.topDivId, this.pageDivId, this.buttonDivId, this.data);
        board.allCreate();        
    };

    this.keywordSearch = function (wId, wSearch, val) {
        var model = new tModel();
        model.keywordSearch(wId, wSearch , val);
    };
    
    this.setWhere = function () {
        var cName = $('#cSearch').val();
        var bName = $('#bSearch').val();
        var cmName = $('#cmSearch').val();
        var uName = $('#uSearch').val();
        var cfTitle = $('#cfSearch').val();
        var cfDate = $('#dateInput').val();
        var bsfSF = $('#bsfSF').val();
        var arr = {};
        var cnt = 0;

        if (cName != "" && cName != " ") {
            arr['cName'] = cName;
            cnt++;
        }
        if (bName != "" && bName != " ") {
            arr['bName'] = bName;
            cnt++;
        }
        if (cmName != "" && cmName != " ") {
            arr['cmName'] = cmName;
            cnt++;
        }
        if (uName != "" && uName != " ") {
            arr['uName'] = uName;
            cnt++;
        }
        if (cfTitle != "" && cfTitle != " ") {
            arr['cfTitle'] = cfTitle;
            cnt++;
        }
        if (cfDate != "날짜" && cfDate != "") {
            arr['cfDate'] = cfDate;
            console.log(arr['cfDate']);
            cnt++;
        }
        if (bsfSF != "No Option") {
            arr['bsfSF'] = bsfSF;
            cnt++;
        }
        if (cnt == 0) {
            arr = "no";
        }

        return arr;
    };
};

Storage.prototype.getObject = function (key) {
    return this.getItem(key) && JSON.parse(this.getItem(key));
};

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};


