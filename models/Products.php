<?php
    namespace Models;
    use \Controllers\NotificationController;
    
    class Products extends Database{
        function getAllProducts():array{
            $table = "products";
            $req = $this->bdd->prepare(
                "SELECT $table.*, functionalities.func_name FROM $table 
                INNER JOIN products_func ON $table.id_product = products_func.id_product 
                INNER JOIN functionalities ON products_func.id_func = functionalities.id ORDER BY $table.id_product ASC"
            );
            $req->execute();
            return $result = $req->fetchAll(\PDO::FETCH_ASSOC);
        }
        function getOneProduct(string $id):array{
            $table = "products";
            $req = $this->bdd->prepare(
                "SELECT $table.*, functionalities.func_name FROM $table 
                INNER JOIN products_func ON $table.id_product = products_func.id_product 
                INNER JOIN functionalities ON products_func.id_func = functionalities.id WHERE $table.id_product = ?"
            );
            $req->execute(["$id"]);
            return $result = $req->rowCount() > 0 ? $req->fetch(\PDO::FETCH_ASSOC) : [];
        }
        public function order(array $ids):bool{
            $data['table'] = "orders";
            $data['user_id'] = $ids[0];
            $data['product_id'] = $ids[1];
           
            $result = $this->insert($data);
            
            //puis on mets à jours le niveau d'accès de l'utilisateur;
            $req = $this->bdd->prepare("UPDATE users SET access = $data[product_id] WHERE id_user = $data[user_id]");
            $req->execute();
            return $result;
            ;
            // return $req;

        }
    }