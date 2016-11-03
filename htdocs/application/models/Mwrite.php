<?php

class Mwrite extends CI_Model
{

    public $sql;
    public $query;
    public $result;

    public function __construct()
    {
        // Call the CI_Model constructor
        parent::__construct();

    }

    //Bulletin board Write
    public function write($arr, $uNum)
    {
        $cNum = $arr['cNum'];
        $cmNum = $arr['cmNum'];
        $bNum = $arr['bNum'];
        $bSf = $arr['bSf'];
        $cfDate = $arr['cfDate'];
        $cfPlace = $arr['cfPlace'];
        $cfStartTime = $arr['cfStartTime'];
        $cfEndTime = $arr['cfEndTime'];
        $cfTitle = $arr['cfTitle'];
        $cfContents = $arr['cfContents'];

        //cNum Get
        $sql = "SELECT cNum FROM company WHERE cName = ?";
        $query = $this->db->query($sql, array($cNum));
        if($query->num_rows() > 0) {
            $cNum = $query->row()->cNum;
        }else {
            $sql = "INSERT INTO company(cName) VALUES (?)";
            $query = $this->db->query($sql, array($cNum));
            if(!$query) {
                $this->db->error();
            }else {
                $sql = "SELECT cNum FROM company WHERE cName = ?";
                $query = $this->db->query($sql, array($cNum));
                $cNum = $query->row()->cNum;
            }
        }

        //bNum Get
        $sql = "SELECT bNum FROM business WHERE bName = ?";
        $query = $this->db->query($sql, array($bNum));
        if($query->num_rows() > 0) {
            $bNum = $query->row()->bNum;
        }else {
            $sql = "INSERT INTO business(bName, cNum) VALUES (?,?)";
            $query = $this->db->query($sql, array($bNum, $cNum));
            if(!$query) {
                $this->db->error();
            }else {
                $sql = "SELECT bNum FROM business WHERE bName = ?";
                $query = $this->db->query($sql, array($bNum));
                $bNum = $query->row()->bNum;
            }
        }

        //cmNum Get
        $sql = "SELECT cmNum FROM companyman WHERE cmName = ?";
        $query = $this->db->query($sql, array($cmNum));
        if($query->num_rows() > 0) {
            $cmNum = $query->row()->cmNum;
        }else {
            $sql = "INSERT INTO companyman(cmName, cNum) VALUES (?,?)";
            $query = $this->db->query($sql, array($cmNum, $cNum));
            if(!$query) {
                $this->db->error();
            }else {
                $sql = "SELECT cmNum FROM companyman WHERE cmName = ?";
                $query = $this->db->query($sql, array($cmNum));
                $cmNum = $query->row()->cmNum;
            }
        }

        //allTime Calc
        $allTime = strtotime(date($cfEndTime)) - strtotime(date($cfStartTime));
        $all = date("H:i", $allTime - 3600);

        //INSERT DB write Board
        $contents = nl2br($cfContents);
        $sql = "INSERT INTO conference(cNum, cmNum, bNum, uNum, cfTitle, cfStartTime, cfPlace, cfContents, cfEndTime, cfAlltime, cfDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $query = $this->db->query($sql, array($cNum, $cmNum, $bNum, $uNum, $cfTitle, $cfStartTime, $cfPlace, $contents, $cfEndTime, $all, $cfDate));

        if (!$query) {
            $this->db->error();
        }

        $sql = "SELECT * FROM businesssf WHERE bNum = ? AND cNum = ?";
        $query = $this->db->query($sql, array($bNum, $cNum));

        if ($query->num_rows() > 0) {
            $sql = "UPDATE businesssf SET bsfSF = ? WHERE bNum = ? AND cNum = ?";
            $query = $this->db->query($sql, array($bSf, $bNum, $cNum));
        } else {
            //Business SF
            $sql = "INSERT INTO businesssf(cNum,bNum,bsfSF) VALUES(?,?,?)";
            $query = $this->db->query($sql, array($cNum, $bNum, $bSf));
        }
    }
}