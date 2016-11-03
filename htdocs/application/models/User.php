<?php

class User extends CI_Model {
    
    public $sql;
    public $query;
    public $result;

    public function __construct() {
        // Call the CI_Model constructor
        parent::__construct();
        
    }

    //login method
    public function login($email, $pass) {
        // SELECT ID
        $sql = "SELECT * FROM user WHERE uId = ?";
        if(!$query = $this->db->query($sql, array($email))) {
            $this->db->error();
        }
        
        if($query->num_rows() > 0) {
            //SELECT PASS
            $row = $query->row();

            if($row->uPass == $pass) {
                return $row;
            }else {
                return "Wrong Password";
            }

        }else {
            return "Wrong Id";
        }
    }
    
}