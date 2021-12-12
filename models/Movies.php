<?php
    namespace Models;

    class Movies extends Database{
        function getAllMovies():array{
            $table = "movies";
            $datas = $this->getAllByTable($table);
            return $datas;
        }
        public function getMoviesId():array{
            $ref = "id_api_movie";
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