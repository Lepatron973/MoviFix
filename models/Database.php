<?php
    namespace Models;
    
    class Database{
        function __construct(){
            try {
                $this->bdd = new \PDO("mysql:dbname=" .BDD_CONNECT['dbname']. "host=" . BDD_CONNECT['host'], BDD_CONNECT['user'], BDD_CONNECT['password']);
            } catch (\PDOException $e) {
                \Controllers\ErrorController::connexionFailed($e);
            }
            
        }

        function insert(array $post):bool{
            if(empty($post))
                return false;
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
            return $req->execute();
        }
        /*
            array @data avec pour valeur :
            "ref" => la colunm correspondante dans la table,
            "table" => la table dans laquelle on va chercher,
            "value" => l'élément de comparaison  
         */
        function getOneByRef(array $data):array{
        
            $req = $this->bdd->prepare("SELECT * FROM $data[table] WHERE  $data[ref] = ?");
            $req->execute(["$data[value]"]);
            return $result = $req->rowCount() > 0 ? $req->fetch(\PDO::FETCH_ASSOC) : [];

        }

        function getAllByTable(string $table):array{
            $req = $this->bdd->prepare("SELECT * FROM $table");
            $req->execute();
            return $result = $req->fetchAll(\PDO::FETCH_ASSOC);
        }
        function getAllByTableAdvanced(string $table,int $limit):array{
            $req = $this->bdd->prepare("SELECT * FROM $table LIMIT $limit");
            $req->execute();
            return $result = $req->fetchAll(\PDO::FETCH_ASSOC);
        }
        function getSpeceficData(string $refToPull,string $table):array{
            $req = $this->bdd->prepare("SELECT $refToPull FROM $table");
            $req->execute();
            return $result = $req->fetchAll(\PDO::FETCH_ASSOC);
        }
        function update(array $post):bool{
            $ref = [];
            $sql = "UPDATE `$post[table]` SET " ;
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
            return $req->execute();
        }
    }