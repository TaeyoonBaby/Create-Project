<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->database();
    }

    public function index()
    {
        $this->load->view('main');
    }

    public function main($start)
    {
        $data['start'] = $start;
        $this->load->view('main', $data);
    }

    public function bulletin()
    {
        $this->load->model('bulletinBoard');
        $result = $this->bulletinBoard->board($_POST);
        echo json_encode($result);
    }
    
    public function seeBulletin()
    {
        $this->load->model('bulletinBoard');
        $result = $this->bulletinBoard->seeBoard($_POST['num']);
        echo json_encode($result);
    }
}
