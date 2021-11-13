<?php
    namespace Models;

    class Movies extends Database{
        public function getMoviesId(){
            $ref = "id_api_movie";
            $table = "movies";
            return $this->getSpeceficData($ref,$table);
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
        public function addMovie(array $data){
            $data['table'] = "movies";
            return $this->insert($data);
        }
    }