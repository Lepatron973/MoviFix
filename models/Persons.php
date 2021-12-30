<?php
    namespace Models;
    use \Controllers\NotificationController;
    
    class Person extends Database{
        function getAllActors():array{
            $table = "actors";
            $datas = $this->getAllByTable($table);
            return $datas;
        }
        public function getMoviesId():array{
            $ref = "id_";
            $table = "movies";
            return $this->getSpeceficData($ref,$table);
        }
        function getOneMovie(string $id):array{
            $table = "movies";
            $movieToGet = array(
                "table" =>  "movies",
                "ref" => "id_api_movie",
                "value" => $id
            );
            $datas = $this->getOneByRef($movieToGet);
            return $datas;
        }
        public function addMovie(array $data):bool{
            $data['table'] = "movies";
            return $this->insert($data);
        }
    }