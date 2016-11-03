<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Search extends CI_Controller
{

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function search() {
        $this->load->model("msearch");
        $result = $this->msearch->search($_POST);

        if (is_array($result)) {
            echo json_encode($result);
        } else {
            echo json_encode(0);
        }
    }
}
