<?php
    namespace Admin_models;

    class AdminUser extends Database{
        function addUser(){
            $_POST["table"] = "users";
                         
            $userToCheck = array(
                "table" =>  "users",
                "ref" => "email",
                "value" => $_POST["email"]
            );
            $uploadDir = ROOT_DIR."/public/ressources/uploads/";
            $uploadFile = $uploadDir . basename($_FILES['image']['name']);
            if($this->checkImage()){
                if(!$this->verifUserExist($userToCheck)){
                    $_POST['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $_POST['image'] = $_FILES['image']['name'];
                    $messageImageDownload = move_uploaded_file($_FILES['image']['tmp_name'],$uploadFile) ? "Image téléchargée !" : "L'image n'a pas pu être téléchargée";
                    echo $messageImageDownload;
                    //  
                    $this->insert($_POST);
                }
                else
                    echo "utilisateur existe déjà";
            }
            
        }

        function verifUserExist($data){
            return $this->getOneByRef($data);
        }


        function checkImage(){
            // Si tu le modifie il faudra aussi le faire sur l'input file (attribut accept)
            $acceptedFormat = array(
                "jpg","jpeg",'png',"svg"
            );
            $message = "image vide";    
            $goOn = false;
            // manipulation permettant d'obtenir seulement l'extension du fichier = png;
            if(empty($_FILES['image']["name"]) && empty($_FILES['image']["type"]))
                $goOn = true; 
            else{
                
                $fileType = substr($_FILES['image']['type'],strpos($_FILES['image']['type'],'/')+1);
                foreach($acceptedFormat as $type){
                    if($fileType == $type){    
                        $goOn = true;
                    }
                }
                $message = $goOn? "Le fichier est valide pour le téléchargement" : "Mauvais format envoyé ";
            }       
            echo $message;
            return $goOn;
        }

        function connectUser(){
            $userToCheck = array(
                "table" =>  "users",
                "ref" => "email",
                "value" => $_POST["email"]
            );
            $check = false;
            if($userData = $this->getOneByRef($userToCheck)){
                if(password_verify($_POST['password'],$userData['password']))
                    $check = true;
                else
                    echo "password incorrect";
            }
            else
                echo "identifiant incorrect";
            return $connected = $check ? $userData : false;;
        }

        function updateUser(){
            $_POST["table"] = "users";
            $_POST["id"] = $_SESSION['user']['id'];             
            $uploadDir = ROOT_DIR."/public/ressources/uploads/";
            $uploadFile = $uploadDir . basename($_FILES['image']['name']);
            if($this->checkImage()){
                
                if(!empty($_POST["password"]))
                    $_POST['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
                if(!empty($_FILES['image']['name']))
                    $_POST['image'] = $_FILES['image']['name'];
                if(empty($_POST["password"]))
                    unset($_POST['password']);


               
                $messageImageDownload = move_uploaded_file($_FILES['image']['tmp_name'],$uploadFile) ? "Image téléchargée !" : "L'image n'a pas pu être téléchargée";
                echo $messageImageDownload;
  
                return $this->update($_POST);
                
            }
        }
    }