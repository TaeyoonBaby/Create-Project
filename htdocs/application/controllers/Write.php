<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Write extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function index() {
        $this->load->view('write');
    }

    public function write() {
        $this->load->model("mwrite");
        $this->mwrite->write($_POST, $_SESSION['user']->uNum);
    }
}
