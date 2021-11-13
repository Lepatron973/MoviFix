<?php
    namespace Admin_models;

    class Database{
        function __construct(){
            $this->bdd = new \PDO("mysql:dbname=" .BDD_CONNECT['dbname']. "charset=utf8;host=" . BDD_CONNECT['host'], BDD_CONNECT['user'], BDD_CONNECT['password']);
        }
        /* 
            insertion automatique de donnée
            @array $post : est La super global $_POST
            à laquelle on a ajouté une clé 'table' qui correspond
            à la table à modifier
        */
        function insert(array $post){
            $ref = [];
            $sql = "INSERT INTO `$post[table]` (" ;
            $i = 1;
            foreach($post as $key => $value){
                if($key != "confirm-password" && $key != "table"){
                    array_push($ref,$key);
                }
            }
            foreach($ref as $key){
                $sql .= "`". $key . "`,";
            }
            $sql = substr_replace($sql,')', strlen($sql)-1);
            $sql .= " VALUES (";
            foreach($ref as $key){
                $sql .= "?,";
            }
            $sql = substr_replace($sql,')', strlen($sql)-1);
            $req = $this->bdd->prepare($sql);

            foreach($ref as $value){
                switch($post[$value]){
                    
                    case is_string($post[$value]):
                        $req->bindValue($i,"$post[$value]", \PDO::PARAM_STR);
                    break;
                    case is_int($post[$value]):
                        $req->bindValue($i,$post[$value], \PDO::PARAM_INT);
                    break;
                    case is_bool($post[$value]):
                        $req->bindValue($i,$post[$value], \PDO::PARAM_BOOL);
                    break;
                }
                $i++;
            }
            print_r("<br>");
            var_dump($req);
            var_dump($req->execute());
        }
        /*
            @array $data avec pour valeur :
            "ref" => la colunm correspondante dans la table,
            "table" => la table dans laquelle on va chercher,
            "value" => l'élément de comparaison  
         */
        function getOneByRef(array $data){
            $req = $this->bdd->prepare("SELECT * FROM $data[table] WHERE  $data[ref] = ?");
         
        
            $req->execute(["$data[value]"]);
            return $result = $req->fetch(\PDO::FETCH_ASSOC);
        }
        /* 
            Récupère toutes les données d'une table
            @string $table : est le nom de la table
         */
        function getAllByTable(string $table){
            $req = $this->bdd->prepare("SELECT * FROM $table");
         
        
            $req->execute();
            return $result = $req->fetchAll(\PDO::FETCH_ASSOC);
        }
        /* 
            Mets à jour une table existante avec pour point de référence
            l'id de la table
            @array $post : est La super global $_POST
            à laquelle on a ajouté une clé 'table' qui correspond
            à la table à modifier
        */
        function update($post){
            $ref = [];
            $sql = "UPDATE `$post[table]` SET " ;
            var_dump($post);
            $i = 1;
            foreach($post as $key => $value){
                if($key != "confirm-password" && $key != "table"){

                    array_push($ref,$key);
                }
            }
            foreach($ref as $key){
                $sql .= "`". $key . "` = ?,";
            }
            
            $sql = substr_replace($sql," WHERE id = $post[id]", strlen($sql)-1);
            $req = $this->bdd->prepare($sql);

            foreach($ref as $value){
                switch($post[$value]){
                    
                    case is_string($post[$value]):
                       
                        $req->bindValue($i,"$post[$value]", \PDO::PARAM_STR);
                    break;
                    case is_int($post[$value]):
                        $req->bindValue($i,$post[$value], \PDO::PARAM_INT);
                    break;
                    case is_bool($post[$value]):
                        $req->bindValue($i,$post[$value], \PDO::PARAM_BOOL);
                    break;
                }
                $i++;
            }
            print_r("<br>");
           
            return $req->execute();
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
    }