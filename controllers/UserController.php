<?php
    namespace Controllers;

    class UserController extends Controller{

        function registration(){
            $this->model->addUser();
        }
        function connexion(){
            var_dump($_POST);
            if($userData = $this->model->connectUser()){

                $_SESSION['user'] = array(
                    "id" => $userData['id'],
                    "firstname" => $userData['firstname'],
                    "lastname" => $userData['lastname'],
                    "email" => $userData['email'],
                    "image" => $userData['image'],
                    "status" => true
                );
            }
        }
        function modifyUser(){
            if($this->model->updateUser()){
                echo "passé";
                $_SESSION['user']['firstname'] = $_POST['firstname'];
                $_SESSION['user']['lastname'] = $_POST['lastname'];
                $_SESSION['user']['email'] = $_POST['email'];
                if(isset($_POST['image']))
                    $_SESSION['user']['image'] = $_POST['image'];
            }
            else
            echo "pas passé";
            
        }

    }