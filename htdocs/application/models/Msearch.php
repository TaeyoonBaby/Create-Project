<?php

class Msearch extends CI_Model {

    public $sql;
    public $query;
    public $result;


    public function __construct() {
        // Call the CI_Model constructor
        parent::__construct();

    }
    
    public function search($arr) {
        $val = "%{$arr['val']}%";

        if($arr['wSearch'] == "cName") {
            $tableName = "company";
            $search = $arr['wSearch'];
        }else if($arr['wSearch'] == "bName") {
            $tableName = "business";
            $search = $arr['wSearch'];
        }else if($arr['wSearch'] == "cmName") {
            $tableName = "companyman";
            $search = $arr['wSearch'];
        }else if($arr['wSearch'] == "uName") {
            $tableName = "user";
            $search = $arr['wSearch'];
        }else {
            $tableName = "conference";
            $search = $arr['wSearch'];
        }
        
        $sql = "SELECT {$search} FROM {$tableName} WHERE {$search} LIKE ?";
        $query = $this->db->query($sql, array($val));

        if($query->num_rows() > 0) {
            $result = array();
            foreach ($query->result() as $row)
            {
                array_push($result, $row->{$search});
            }
            return $result;
        }else {
            return 0;
        }
    }
}