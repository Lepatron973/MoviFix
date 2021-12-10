<?php
    namespace Models;

    class Movies extends Database{
        function getAllMovies(){
            $table = "movies";
            $datas = $this->getAllByTable($table);
            return $datas;
        }
        public function getMoviesId():array{
            $ref = "id_api_movie";
            $table = "movies";
            return $this->getSpeceficData($ref,$table);
        }
        function getOneMovie($id):array{
            $table = "movies";
            $movieToGet = array(
                "table" =>  "movies",
                "ref" => "id_api_movie",
                "value" => $id
            );
            $datas = $this->getOneByRef($movieToGet);
            return $datas;
        }
        public function addMovie(array $data):void{
            $data['table'] = "movies";
            $this->insert($data);
        }
    }