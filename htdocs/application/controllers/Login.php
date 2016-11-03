<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->database();
	}

	public function index() {
		$this->load->view('login/login');
	}

	public function login() {
		$this->load->model('user');
		$result = $this->user->login($_POST['email'],$_POST['pass']);

		if(is_object($result)) {
			$_SESSION['user'] = $result;
			require_once 'Main.php';
			$main = new main();
			$main->main(0);
		}else {
			$data['msg'] = $result;
			$this->load->view('login/login', $data);
		}
	}
}
