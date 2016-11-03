/**
 * Created by 태유니 on 2016-11-03.
 */
var tModel = function () {
    this.boardModel = function (startPage, where) {
        var start = startPage * 1;
        var maxCnt = 10;
        var maxBottom = 5;
        var startB = Math.ceil((start + 1) / maxBottom);
        var endB = 0;
        var tData = 0;

        sessionStorage.setObject("where", where);
        sessionStorage.setItem("pageNum", start);

        $.ajax({
            type: "POST",
            url: "/main/bulletin",
            data: {"start": start, "maxCnt": maxCnt, "where": where},
            dataType: "json",
            async: false,
            success: function (data) {
                var dataL = data.length - 1;
                endB = ((startB * maxBottom) <= Math.ceil(data[dataL] / maxCnt)) ? (startB * maxBottom) : Math.ceil(data[dataL] / maxCnt);
                data[dataL] = startB;
                data[dataL + 1] = endB;
                tData = data;
            }
        });
        return tData;
    };

    this.titleModel = function (num) {
        var tData = 0;

        $.ajax({
            type: "POST",
            url: "/main/seeBulletin",
            data: {"num": num},
            dataType: "json",
            async: false,
            success: function (data) {
                tData = data;
            }
        });
        return tData;
    };

    this.writeGoMdel = function (cNum, cmNum, bNum, bSf, cfDate, cfStartTime, cfEndTime, cfPlace, cfTitle, cfContents) {
        $.ajax({
            type: "POST",
            url: "/write/write",
            data: {
                "cNum": cNum,
                "cmNum": cmNum,
                "bNum": bNum,
                "bSf": bSf,
                "cfDate": cfDate,
                "cfStartTime": cfStartTime,
                "cfEndTime": cfEndTime,
                "cfPlace": cfPlace,
                "cfTitle": cfTitle,
                "cfContents": cfContents
            },
            dataType: "json",
            success: function (data) {

            }
        });
    };

    this.keywordSearch = function (wId, wSearch, val) {
        $.ajax({
            type: "POST",
            url: "/search/search",
            dataType: "json",
            data: {"wSearch": wSearch, "val": val},
            success: function (data) {
                if(data != 0) {
                    $('#' + wId).autocomplete({
                        source: data
                    });
                }
            }
        });
    };
};