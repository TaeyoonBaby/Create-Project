<?php

class BulletinBoard extends CI_Model
{

    public $sql;
    public $query;
    public $result;

    public function __construct()
    {
        // Call the CI_Model constructor
        parent::__construct();

    }

    public function board($arr)
    {
        $where = (is_array($arr['where']) || is_object($arr['where'])) ? $arr['where'] : "";
        $start = $arr['start'] * $arr['maxCnt'];
        $arr['maxCnt'] = $arr['maxCnt'] * 1;
        $result = array();


        if (is_array($where) || is_object($where)) {
            $str = "AND ";
            if (isset($where['cName'])) {
                $str .= "cName LIKE '%{$where['cName']}%' ";
            }
            if (isset($where['bName'])) {
                if ($str != "AND ") {
                    $str .= "AND ";
                }
                $str .= "bName LIKE '%{$where['bName']}%' ";
            }
            if (isset($where['cmName'])) {
                if ($str != "AND ") {
                    $str .= "AND ";
                }
                $str .= "cmName LIKE '%{$where['cmName']}%' ";
            }
            if (isset($where['uName'])) {
                if ($str != "AND ") {
                    $str .= "AND ";
                }
                $str .= "uName LIKE '%{$where['uName']}%' ";
            }
            if (isset($where['cfTitle'])) {
                if ($str != "AND ") {
                    $str .= "AND ";
                }
                $str .= "cfTitle LIKE '%{$where['cfTitle']}%' ";
            }
            if (isset($where['cfDate'])) {
                if ($str != "AND ") {
                    $str .= "AND ";
                }
                $str .= "cfDate >= '{$where['cfDate']}' ";
            }
            if (isset($where['bsfSF'])) {
                if ($str != "AND ") {
                    $str .= "AND ";
                }
                $str .= "bsf.bsfSF = {$where['bsfSF']} ";
            }
            $where = $str;
        }
        
        $sql = "SELECT cf.cfNum cfNum , c.cName cName, cm.cmName cmName, u.uName uName , b.bName bName, bsf.bsfSF bsfSF, cf.cfDate cfDate, cf.cfStartTime cfStartTime, cf.cfEndTime cfEndTime, cf.cfPlace cfPlace, cf.cfTitle cfTitle FROM conference cf, company c, business b, businesssf bsf, companyman cm, user u WHERE u.uNum = cf.uNum AND cf.cNum = c.cNum AND cf.bNum = b.bNum AND bsf.cNum = cf.cNum AND bsf.bNum = cf.bNum AND cf.cmNum = cm.cmNum {$where} ORDER BY cfDate DESC, cfStartTime DESC LIMIT ?,?";
        $query = $this->db->query($sql, array($start, $arr['maxCnt']));
        if (!$query) {
            $this->db->error();
        }
        foreach ($query->result() as $row) {
            $rowArr = [$row->cfNum,$row->cName,$row->bName,$row->cfTitle,$row->cmName,$row->uName,$row->cfPlace,$row->cfDate,$row->cfStartTime,$row->cfEndTime];
            array_push($result, $rowArr);
        }

        if ($where == "") {
            $sql = "SELECT cfNum FROM conference";
        } else {
            $sql = "SELECT cfNum FROM conference cf, company c, business b, businesssf bsf, companyman cm, user u WHERE u.uNum = cf.uNum AND cf.cNum = c.cNum AND cf.bNum = b.bNum AND bsf.cNum = cf.cNum AND bsf.bNum = cf.bNum AND cf.cmNum = cm.cmNum {$where}";
        }
        $query = $this->db->query($sql);
        array_push($result, $query->num_rows());

        return $result;
    }

    function seeBoard($num)
    {
        $sql = "SELECT cf.cfNum cfNum , c.cName cName, cm.cmName cmName, u.uName , b.bName bName, bsf.bsfSF bsfSF, cf.cfDate cfDate, cf.cfStartTime cfStartTime, cf.cfEndTime cfEndTime, cf.cfPlace cfPlace, cf.cfTitle cfTitle, cfContents FROM conference cf, company c, business b, businesssf bsf, companyman cm, user u WHERE u.uNum = cf.uNum AND cf.cNum = c.cNum AND cf.bNum = b.bNum AND bsf.cNum = cf.cNum AND bsf.bNum = cf.bNum AND cf.cmNum = cm.cmNum AND cf.cfNum = ?";
        $query = $this->db->query($sql, array($num));
        if ($query->num_rows() > 0) {
            if($query->row()->bsfSF == 0) {
                $query->row()->bsfSF = "진행중";
            }else if($query->row()->bsfSF == 1) {
                $query->row()->bsfSF = "실패";
            }else {
                $query->row()->bsfSF = "성공";
            }
            $row = $query->row();
            //"상대회사", "상대영업사원", "비즈니스명", "비즈니스 진행상황", "날짜", "만난 시간", "끝난 시간", "장소", "제목", "내용"
            $bsf = $row->bsfSF;
            if($bsf == 0) {
                $bsf = "진행중";
            }else if($bsf == 1) {
                $bsf = "실패";
            }else if($bsf == 2) {
                $bsf = "성공";
            }
            $arr = [$row->cName,$row->cmName,$row->bName,$bsf,$row->cfDate,$row->cfStartTime,$row->cfEndTime,$row->cfPlace,$row->cfTitle,$row->cfContents];
            return $arr;
        }else {
            return 0;
        }
    }
}