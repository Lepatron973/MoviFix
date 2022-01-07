<?php
    namespace Controllers;
    use \Controllers\NotificationController;

    class UserController extends Controller{

        function registration():void{
            if(isset($_POST['submit']))
                unset($_POST['submit']);  
            $this->model->addUser();
        }
        function connexion():void{
            $userData = $this->model->connectUser();
            if(!empty($userData)){

                $_SESSION['user'] = array(
                    "id" => $userData['id_user'],
                    "firstname" => $userData['firstname'],
                    "lastname" => $userData['lastname'],
                    "email" => $userData['email'],
                    "image" => $userData['image'],
                    "access" => $userData['access'],
                    "status" => true
                );
            }
        }
        function modifyUser():void{
            if(isset($_POST['submit']))
                unset($_POST['submit']);
            if($this->model->updateUser()){
                NotificationController::notification(1,"Mise à jour éffectuée");
                $_SESSION['user']['firstname'] = $_POST['firstname'];
                $_SESSION['user']['lastname'] = $_POST['lastname'];
                $_SESSION['user']['email'] = $_POST['email'];
                if(isset($_POST['image']))
                    $_SESSION['user']['image'] = $_POST['image'];
            }
            else
               NotificationController::notification(0,"La mise à jour a échoué");
            
        }

    }