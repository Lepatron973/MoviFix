<?php
    namespace Models;
    use \Controllers\NotificationController;
    
    class Actors extends Database{
        function getAllActors():array{
            $table = "actors";
            $datas = $this->getAllByTable($table);
            return $datas;
        }
        public function getActorsId():array{
            $ref = "id_actor";
            $table = "actors";
            return $this->getSpeceficData($ref,$table);
        }
        function getOneActor(string $id):array{
            $actorToGet = array(
                "table" =>  "actors",
                "ref" => "id_actor",
                "value" => $id
            );
            $datas = $this->getOneByRef($actorToGet);
            return $datas;
        }
        public function addActor(array $data):bool{
            $data['table'] = "actors";
            return $this->insert($data);
        }
    }