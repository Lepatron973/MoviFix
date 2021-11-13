<?php
    namespace Admin_models;

    class AdminMovies extends Database{
        function getAllMovies(){
            $table = "movies";
            $datas = $this->getAllByTable($table);
            return $datas;
        }
        function getOneMovie($id){
            $table = "movies";
            $movieToGet = array(
                "table" =>  "movies",
                "ref" => "id",
                "value" => $id
            );
            $datas = $this->getOneByRef($movieToGet);
            return $datas;
        }
        function updateMovie(){
            $_POST['table'] =  "movies";

            $uploadDir = ROOT_DIR."/public/ressources/uploads/";
            $uploadFile = $uploadDir . basename($_FILES['image']['name']);
            if($this->checkImage()){
                if(!empty($_FILES['image']['name']))
                    $_POST['image'] = $_FILES['image']['name'];
                $messageImageDownload = move_uploaded_file($_FILES['image']['tmp_name'],$uploadFile) ? "Image téléchargée !" : "L'image n'a pas pu être téléchargée";
                echo $messageImageDownload;
                $this->update($_POST);
            }
        }

        function addMovie(){
            $_POST['table'] = "movies";
            $this->insert($_POST);
        }
    }