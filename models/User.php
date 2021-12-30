<?php
    namespace Models;
    use \Controllers\NotificationController;

    class User extends Database{
        function addUser():void{
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
                    if($this->insert($_POST))
                        NotificationController::notification(1,"Enregistrement réussi");
                    else
                        NotificationController::notification(0,"Enregistrement échoué");
                }
                else
                NotificationController::notification(0,"Cet utilisateur est déjà créé");

            }
            
        }

        function verifUserExist(array $data):bool{
            $result = !empty($this->getOneByRef($data))? true : false;
            return $result;
        }


        function checkImage():bool{
            // Si tu le modifie il faudra aussi le faire sur l'input file (attribut accept)
            $acceptedFormat = array(
                "jpg","jpeg",'png',"svg"
            );
            $message = "image vide";    
            $goOn = false;
            // On vérifie si une image est contenue dans la variable FILE
            if(empty($_FILES['image']["name"]) && empty($_FILES['image']["type"]))
            $goOn = true; 
            else{ 
                // manipulation permettant d'obtenir seulement l'extension du fichier = png;
                $fileType = substr($_FILES['image']['type'],strpos($_FILES['image']['type'],'/')+1);
                foreach($acceptedFormat as $type){
                    if($fileType == $type){    
                        $goOn = true;
                    }
                }
                $status = $goOn == true ? 1 : 0;
                if($status)
                    NotificationController::notification($status, "Le fichier est valide pour le téléchargement");
                else
                    NotificationController::notification($status, "Mauvais format envoyé ");
            }       
            //echo $message;
            return $goOn;
        }

        function connectUser():array{
            $userToCheck = array(
                "table" =>  "users",
                "ref" => "email",
                "value" => $_POST["email"]
            );
            $check = false;
            $userData = $this->getOneByRef($userToCheck);
            if(!empty($userData)){
                if(password_verify($_POST['password'],$userData['password'])){
                    NotificationController::notification(1,"Connexion réussi");
                    return $userData;
                }
            }
            else
                NotificationController::notification(0,"Identifiant ou mots de passe incorrect");
            return [];
        }

        function updateUser():bool{
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


                // teste si l'image à été téléchargé ou non et retourne un message selon la situation
                $status = move_uploaded_file($_FILES['image']['tmp_name'],$uploadFile) ? 1 : 0;
                if($status)
                    NotificationController::notification($status, "Image téléchargée !");
                else
                    NotificationController::notification($status, "L'image n'a pas pu être téléchargée");
  
                return $this->update($_POST);
                
            }
        }
    }